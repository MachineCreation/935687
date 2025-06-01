# Avantos Journey Builder Challenge

This project is my implementation of the Avantos Journey Builder coding challenge.

## Status

I had a great time working on this — it was a fun and thoughtful challenge!  
While I wasn’t able to complete every feature due to time constraints, I focused on building a clean foundation that supports:

- Fetching and rendering a DAG of forms
- Displaying each form dynamically based on its schema
- Viewing and editing prefill mappings using a modal
- Traversing upstream dependencies in the DAG

Where I fell short:

- have not cut off all helper functions into their own files in the dir
- have not modified the prefill modal to show value fields
- have not added global fields
- have not added unit tests

Also it looks rough. I didn't have a chance to set the modal to render on the field it is being called up for or really deviate from the stock react-vite styles at all.

That being said the code is structured to be easily extended, and I would love the opportunity to keep building on this!

## How to run it locally

1. Clone the repository to the intended local machine
2. In terminal navigate to the journey_builder folder<br />
bash $ cd journey_builder
3. In terminal install dependencies<br/>
bash $ npm i <span style="color: red">OR</span> npm install
4. You may get an error in tsconfig.app.json "Unknown compiler option 'erasableSyntaxOnly'"<br />
The line '"erasableSyntaxOnly": true,' can be removed safely from tsconfig.app.json and tsconfig.node.json
5. In terminal run react-vite<br />
bash $ npm run dev

Be sure you have the frontendchallengeserver installed and running on the same machine.
if you don't you can find it here  https://github.com/mosaic-avantos/frontendchallengeserver
    

Thanks again for the challenge — I really enjoyed it. I know I didn't get it done but I would love the chance to chat with someone anyway.
