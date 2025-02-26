JavaScript Scraper Bookmarklet
This JavaScript bookmarklet extracts endpoints, query parameters, and JavaScript file references from a webpage, displaying them in an easy-to-read format.
Features
•	Extracts API endpoints found in script tags and page content.
•	Identifies query parameters and their sources.
•	Lists JavaScript files linked within the page.
•	Displays results in a visually structured overlay.
How to Use
Method 1: Bookmarklet (Recommended)
1.	Copy the script below:
javascript:(function(){ /* Insert the entire script here */ })();
2.	Open your browser's bookmarks manager.
3.	Create a new bookmark.
4.	In the URL field, paste the copied script.
5.	Save the bookmark.
6.	When visiting a webpage, click the bookmark to execute the script.
Method 2: Console Execution
1.	Open your browser's Developer Tools (F12 or Right-click > Inspect > Console).
2.	Paste the entire script into the console.
3.	Press Enter to run it.
Output
•	A pop-up overlay will appear on the page displaying:
o	Extracted endpoints.
o	Identified query parameters with their sources.
o	JavaScript file references found on the page.
Notes
•	Ensure pop-ups are enabled for the script overlay to appear.
•	May not work on websites with strong Content Security Policies (CSP).
•	For external script analysis, the script fetches JavaScript files and processes their content.
Enjoy scraping! 🚀

