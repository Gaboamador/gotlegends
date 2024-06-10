// import fetch from 'node-fetch';

const GITHUB_API_URL = 'https://api.github.com';
const OWNER = 'Gaboamador'; // Your GitHub username
const REPO = 'gotlegends-data'; // Your repository name
const FILE_PATH = 'builds.json';
const BRANCH = 'main'; // The branch you want to update

// You need to set your GitHub personal access token as an environment variable
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchData = async () => {
    try {
      const timestamp = new Date().getTime(); // Unique timestamp
  
      const response1 = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${FILE_PATH}?_=${timestamp}`);
      const builds = await response1.json();

      return { builds };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const pushData = async (newBuild) => {
    try {
      // Fetch the current file data
      const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const fileData = await response.json();
      const fileContent = atob(fileData.content); // Decode base64 to string
      const builds = JSON.parse(fileContent);
  
      // Add new build to the top
      builds.unshift(newBuild);
  
      // Create updated content
      const updatedContent = btoa(JSON.stringify(builds, null, 2)); // Encode string to base64
  
      // Update the file on GitHub
    const updateResponse = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Add new build',
        content: updatedContent,
        sha: fileData.sha,
        branch: BRANCH
      })
    });

    if (!updateResponse.ok) {
      throw new Error(`Error updating file: ${updateResponse.statusText}`);
    }

    console.log('File updated successfully');
  } catch (error) {
    console.error('Error pushing data:', error);
    throw error;
  }
};