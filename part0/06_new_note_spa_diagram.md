```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        server->>browser: 201 Created

        Note right of browser: The server does not receive any more HTTP requests.<br/> Instead, spa.js overwrites the form's default behaviour, preventing any more GET requests. <br/>It pushes the note into a local array gathered from a .json in the server files, empties the form field and re-renders every note.