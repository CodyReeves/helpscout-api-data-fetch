### HelpScout API Data Fetcher

#### Description
This Node.js script is designed to fetch conversations from the HelpScout API and save them as a CSV file. It queries the HelpScout API for conversations, fetches the threads for each conversation, sanitizes the HTML content, and then compiles the data into a CSV file. This tool is useful for exporting and analyzing customer support interactions from HelpScout.

#### Features
- Fetch conversations with specific statuses (closed, pending) from HelpScout.
- Retrieve and process conversation threads.
- Sanitize HTML content in the threads.
- Save conversation details in a CSV file.

#### Requirements
- Node.js
- npm packages: `axios`, `csv-writer`

#### Installation
1. Clone the repository or download the script.
2. Run `npm install` to install the required packages.

#### Usage
1. Set the `ACCESS_TOKEN` variable in the script with your OAuth token from HelpScout.
2. Run the script using `node <script-name>.js`.
3. The script will save the conversations to `helpscout_conversations.csv`.

#### Configuration
- `BASE_URL`: URL of the HelpScout API.
- `ACCESS_TOKEN`: Your OAuth token for authentication.
- `CSV_FILE`: The output CSV file name.

#### Functions
- `fetchConversations`: Fetches a page of conversations from HelpScout.
- `fetchThreads`: Retrieves the threads of a specific conversation.
- `sanitizeHtml`: Removes HTML tags and formats the text content.
- `saveToCsv`: Saves the fetched conversation data to a CSV file.
- `main`: Orchestrates the fetching and saving processes.

#### Error Handling
The script includes basic error handling for API requests and logs errors to the console.

#### Note
Ensure you have the necessary permissions and valid access token from HelpScout for the script to function properly.

#### Disclaimer
This script is provided as-is, and users should modify it according to their specific needs and HelpScout API changes.
