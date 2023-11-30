const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const BASE_URL = "https://api.helpscout.net/v2";
const ACCESS_TOKEN = "";  // Replace with your OAuth token
const CSV_FILE = "helpscout_conversations.csv";

const csvWriter = createCsvWriter({
    path: CSV_FILE,
    header: [
        { id: 'id', title: 'ID' },
        { id: 'subject', title: 'Subject' },
        { id: 'status', title: 'Status' },
        { id: 'threads', title: 'Threads' }
    ]
});

const fetchConversations = async (page = 1) => {
    try {
        console.log(`Fetching conversations, Page: ${page}`);
        const response = await axios.get(`${BASE_URL}/conversations?page=${page}&status=closed,pending`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching conversations on Page ${page}: ${error}`);
        return null;
    }
};

const fetchThreads = async (conversationId) => {
    try {
        console.log(`Fetching threads for Conversation ID: ${conversationId}`);
        const response = await axios.get(`${BASE_URL}/conversations/${conversationId}/threads`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
        });
        return response.data._embedded.threads;
    } catch (error) {
        console.error(`Error fetching threads for Conversation ID ${conversationId}: ${error}`);
        return [];
    }
};

const sanitizeHtml = (text) => {
    return text
      .replace(/<\/?[^>]+(>|$)/g, "") // Removes HTML tags
      .replace(/\r?\n|\r/g, " "); // Replaces new lines and carriage returns with a space
};


const saveToCsv = async (conversations) => {
    for (const convo of conversations) {
        const threads = await fetchThreads(convo.id);
        const threadDetails = threads.map(thread => 
            sanitizeHtml(thread.body || thread.action.text || 'No Content')
        ).join('; ');
                
        console.log(`Saving conversation ID ${convo.id} to CSV`);
        await csvWriter.writeRecords([{
            id: convo.id,
            subject: convo.subject,
            status: convo.status,
            threads: threadDetails
        }]);
    }
};

const main = async () => {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const data = await fetchConversations(page);
        if (!data) break; // Exit if there was an error

        const conversations = data._embedded.conversations;
        if (conversations.length === 0) {
            console.log('No more conversations found.');
            break;
        }

        await saveToCsv(conversations);

        page++;
        hasMore = data._links && data._links.next; // Check if there's a next page
    }

    console.log('Finished fetching all conversations.');
};

main().catch(error => console.error(`An error occurred: ${error}`));