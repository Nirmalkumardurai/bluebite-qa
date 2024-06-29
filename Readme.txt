1. Clone Git Repository
Clone your Git repository that contains the Cypress tests to your local machine.
2. Navigate to Command Line Interface
Open your command line interface (Command Prompt for Windows).
3. Install Dependencies (if necessary)
If you haven't installed dependencies before, run the following command to install Cypress and other dependencies listed in package.json.
--npm install

4.Run Cypress Tests
Run your Cypress tests using either Chrome in headed (visible browser) or headless (browser runs in the background) mode.

Headed (Visible Browser):
--npx run browser:chrome-headed

or 

Headless (Background Browser):
--npx run browser:chrome-headless

5.Generate Allure Reports
After running your tests, generate Allure reports to visualize test results.

--npx run report:allure

6.View Allure Report
Open the generated Allure report in your default web browser to view detailed test results.

--npx allure open
