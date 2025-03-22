# Project Informations 
## Quick Heads-Up ##

This project has not been completed entirely yet, but the missing features will be added and updated until March 27. The missing features are :
- Other responsive screen codes for smaller than 1400px,
- UI information messages for every situation
- Change color palette that is not appropriate for e-commerce

<img src='./public/project_Image_ss_.png' alt='readme_photo' />

## Features
This is an e-commerce website that is selling electronic products. In this site, users can create an account with email and password, they can login-signin. If customers logged in properly, they can reach their basketPages or userProfilePages. Users  can search in all products for thing which they want spesific product (paying attention to case-sensitivity) or they can learn more info by clicking the product "more" button. You can see your registration date and nickname, add the product to your basket. It's a symbolic e-commerce website to do practice. So of course you cannot buy really a product or pass to payment page naturally. But you can try most of things that a customer do in a regular online shop.

## Technologies - Libraries - Frameworks
The website's basic design was prepared by ordinary languages, `HTML5`, `CSS3` but while css codes were writing, `Scss - Sass` pre-processor were used and compiled with a VS Code extension automatically. In this `React.js` project, `react-router-dom` provided smooth page navigation. `Firebase SDK`' s auth-part was used for Authentication and authorization process in website. Project is saving unnecessary datas like basket items, to browser local storage by some static class functions. But it is keeping user datas and example product datas  in database by `Firebase / Firestore`. So, when a user wrote a word in the search-bar, project send a qouery to database with firebase methods and async js functions. Most of variable (includings functions) was written via `TypeScript`'s type notation and context api structure transfered some significant objects like "auth" or "user" to other components.

## To Run Project
* Clone repository's branch with `git clone [ "this_repo_link" ] main` command
* go and locate in main folder and install all necessary packages with `npm install`
* run project with `npm run dev`
* If page doesn't open in the browser's regular localhost address, write true link and port that are same in vite-config file, server address was adjusted as `http://127.0.0.1:4444/`.