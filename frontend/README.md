[![cover](src/images/readme/cover.png)](https://kobewinona.github.io/react-mesto-auth)

# Mesto (React-Auth)
[![React](https://img.shields.io/npm/v/react?style=flat-square)](https://www.npmjs.com/package/react)

[![Dima Klimkin Profile Page](https://img.shields.io/badge/Dima_Klimkin-f9f9f9?style=for-the-badge&logoColor=000&logo=github)](https://github.com/kobewinona)
[![React-Mesto-Auth Gh-Pages Page](https://img.shields.io/badge/GitHub_Pages-Mesto_React-f9f9f9?style=for-the-badge&logo=githubpages)](https://kobewinona.github.io/react-mesto-auth/)

[![HTML5](https://img.shields.io/badge/HTML5-f9f9f9?style=for-the-badge&logo=HTML5)](https://dev.w3.org/html5/spec-LC/)
[![CSS3](https://img.shields.io/badge/CSS3-f9f9f9?logoColor=264BDC&style=for-the-badge&logo=CSS3)](https://www.w3.org/TR/CSS/#css)
[![JavaScript](https://img.shields.io/badge/JavaScript-f9f9f9?style=for-the-badge&logo=JavaScript)](https://www.javascript.com)
[![React](https://img.shields.io/badge/React-f9f9f9?style=for-the-badge&logo=React)](https://react.dev)
[![CRA](https://img.shields.io/badge/CRA-f9f9f9?style=for-the-badge&logo=createreactapp)](https://create-react-app.dev)
[![Git](https://img.shields.io/badge/Git-f9f9f9?style=for-the-badge&logo=git)](https://git-scm.com) [![BEM](https://img.shields.io/badge/BEM-f9f9f9?logoColor=black&style=for-the-badge&logo=bem)](https://en.bem.info/methodology/)
[![Node.js](https://img.shields.io/badge/Node.js-f9f9f9?style=for-the-badge&logo=Node.js)](https://nodejs.org/en)

[![Webstorm](https://img.shields.io/badge/Webstorm-f9f9f9?style=for-the-badge&logoColor=0066b8&logo=webstorm)](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiojunJrob_AhVBkmYCHUo9CkEYABAAGgJzbQ&ae=2&ohost=www.google.com&cid=CAESbeD2s_3F28tibUacQadmzB0nEItOP3IL0oRLAm8j0strsLviP55uS6YTuBUFZQG24kmk3q8Xv2nuYCUJ8LbmJZMmihBZSh3znKnfbQqjzSE39ZO6EuHtsdu2uToYj-Wqk3zF5I7Z8d7JAC9U89k&sig=AOD64_2Kp70jUNhk8FFzOAXsp6uOTrLJZQ&q&adurl&ved=2ahUKEwjKs-PJrob_AhVRSGwGHayEAzAQ0Qx6BAgJEAE&nis=2&dct=1)

## contents

- [registration and authorization](#registration-and-authorization)
- [about this project](#about-this-project)
- [what I learned doing this project](#what-I-learned-doing-this-project)
    - [localStorage and sessionStorage](#localStorage-and-sessionStorage)
    - [authentication and authorization](#authentication-and-authorization)
    - [HOC and wrapping in other components](#HOC-and-wrapping-in-other-components)

## registration and authorization

Please feel free to register with any fake email and password, for example you can use oioi@oioi.com and a password like oioioi - it's fine.


## about this project

This is my project using`React` with authorization and registration. In this project I’m learning about `JWT`, `localStorage` and `protected routes`.

The website is all about showcasing different places in Russia, and it allows you to personalize your profile by changing your name and job, uploading new pictures of interesting locations, and even giving them a little ❤️.

## what I learned doing this project

### localStorage and sessionStorage

In addition to learning about different types of client's storage like `localStorage` and `sessionStorage` and how to add, get or delete an item, I also learned about how to check with the server after getting a saved token, JWT in this case. This allowed me to have a better understanding of how the data is stored and retrieved, and how it can be used to authenticate and authorize users. By learning these concepts, I was able to apply them effectively to the project and ensure that the user's data is secure and protected. For this I used HOC `ProtectedRoute` that makes a route possible only if token check is complete and successful.

### authentication and authorization

Before starting this project, I learned the concepts of `identification`, `authentication`, and `authorization`. I studied the differences between these fundamental concepts of security and privacy. By understanding these concepts, I was able to apply them effectively to the project. Additionally, I looked at different examples to understand how these concepts are used in real-world scenarios. All of this helped me to feel confident when working on this project.

### HOC and wrapping in other components

When working with `React` and `HOC`, I learned that there are different ways to write and use them. One common convention is to use function composition to wrap a component with additional functionality. Another convention is to use the `children` property to pass components or elements to the wrapped component. In addition, HOC can be used to handle certain behaviors, such as authentication or data fetching, that can then be reused across multiple components. By using HOC in this way, it can help to reduce code duplication and make code more modular and reusable.

In the context of this project, I used an HOC called `ProtectedRoute` to ensure that certain routes were only accessible if the user had been authenticated and authorized. It allows to reuse this functionality across multiple components and ensure that the user's data is secure and protected.

---

&hearts; thanks to yandex practicum team