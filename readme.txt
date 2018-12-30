Setup application:
1. Download node.js at https://nodejs.org/en/download/ and install on local machine.
2. Open command console, run following commands: 
   node --version
   npm --version
3. If you don't have MySQL on your local machine, then you need to install one.
4. If you don't have Hymns database installed on your machine, Find file 'SampleDB.sql' in application folder and run it on MySQL, this script will help you to create database and insert some sample data.
5. In same folder, find the file 'config.json'. Change settings as you need. Notice: the settings 'user' and 'password' are required to connect your local MySQL database.
6. Under application folder at command console, run the command 'npm start' to start the server. If there is no error message, go to next step. 
7. Open browser, input URL 'http://localhost:YOURPORT/'. ('YOURPORT' is the port number you set in config.json).

User guide:
1. Using "ALT + S" to show the search bar, and "ALT + H" to hide it.(Usually you don't need hide the search bar, since it will disappear automatically after you select the song.)
2. At 'Song Title' textbox, input song_id or song name, the full song name will popup as autocomplete. After you move the cursor to the selected item, you need to type "enter" twice, first time to confirm you choose, second time to open the song.
3. After song is loaded in screen, using 'Page Up', 'Page Down' to select the page.