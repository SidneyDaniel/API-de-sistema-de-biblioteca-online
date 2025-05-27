import { formatDate, verifyKeyBook, verifyKeysBooks, verifyKeysUsers, verifyKeysUsersData } from "../support/commands";
import { bookData } from "../fixtures/book";

describe('Route Test', () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('/');
      cy.get('#username').type('adm12@gmail.com');
      cy.get('#pv_id_5').type('adm1234567');
      cy.get('#app button').click();
      cy.url().should('not.include', '/login');
    });
  });

  context("POST /signup", () => {
    it("🆕🔐 Should create a new user via signup", () => {

      cy.request('POST', '/signup', {
        displayName: 'User Cypress Test',
        email: 'cypresstest01@gmail.com',
        password: 'testcypress'
      }).then((response) => {
        cy.log(`${response}`)
        cy.log(`${response.body}`)
      });
    })
  })

  const listOfUsers = []
  const receivedUid = {uid: ''}

  context("GET /user-management/all", () => {
    it("📋👤 Should fetch all users and store the test user UID", () => {
      cy.request("GET", "/user-management/all").then((response) => {
        const body = response.body

        expect(response.status).to.eq(200)
        expect(body).to.have.property('users')
        expect(body.users).to.be.an('array')

        verifyKeysUsers(body)

        listOfUsers.push(...body.users)
        const cypressUserEmails = listOfUsers
          .filter(user => user.email.toLowerCase() === 'cypresstest01@gmail.com')
          .map(user => user.uid)
        
          receivedUid.uid = cypressUserEmails[0]
      })
    })
  })

  context("GET /user-management/data", () => {
    it("📄🔍 Should fetch the current user’s data", () => {

      cy.request("GET", "/user-management/data").then((response) => {
        const body = response.body

        expect(response.status).to.eq(200)
        expect(body).to.be.an('Object')

        verifyKeysUsersData(body)
      })
    })
  })

  context("PUT /user-management/adm/edit", () => {
    it("✏️👤 Should update a user’s name and email", () => {

      cy.request('PUT', '/user-management/adm/edit', {
        newUserEmail: "cypresstest02@gmail.com",
        newUserName: "cypress edit test",
        userIdentifier: receivedUid.uid
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('success', true);

        expect(response.body).to.have.property('user');
        expect(response.body.user).to.include.all.keys('uid', 'displayName', 'email');
      });
    })
  })

  
  context("DELETE /user-management/del", () => {
    it("🗑️👤 Should delete the test user", () => {
      cy.request('DELETE', '/user-management/del', {
        userIdentifier: receivedUid.uid
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    })
  })



  context("GET /book", () => {
    it("📚📥 Should fetch the list of all books", () => {

      cy.request("GET", "/book").then((response) => {
        const body = response.body

        expect(response.status).to.eq(200)
        expect(body).to.be.an('Object')
        expect(body).to.have.property('ALLBOOKS')
        verifyKeysBooks(body)
        cy.log(body)
      })
    })
  })

  context("GET /book/last", () => {
    it("📚🕑 Should fetch the most recently added book", () => {

      cy.request("GET", "/book/last").then((response) => {
        const body = response.body

        expect(response.status).to.eq(200)
        expect(body).to.be.an('Object')
        
        verifyKeyBook(body)
        
        cy.log(body)
      })
    })
  })

    context("POST /book/registered", () => {
    it("📅🔍 Should search for books by registration date", () => {
      cy.request('POST', '/book/registered', {
        date: formatDate()
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).have.property('dates')
        expect(response.body).have.property('dates').to.be.an('array')
        
        expect(response.body).have.property('booksByDay')
        expect(response.body).have.property('booksByDay').to.be.an('object')

        const { dates, booksByDay } = response.body;

        dates.forEach(date => {
          expect(date).to.match(/^\d{1,2}-\d{1,2}-\d{4}$/);
        });

        Object.keys(booksByDay).forEach(date => {
          expect(date).to.match(/^\d{1,2}-\d{1,2}-\d{4}$/);
        });
      });
    })
  })

  
  context("POST /book/add", () => {
    it("➕📘 Should create a new book", () => {
      cy.log(bookData.title.current)
      cy.request('POST', '/book/add', {
        bookName: bookData.title.current,
        bookAuthor: bookData.author,
        bookPublisher: bookData.publisher,
        numberOfPages: bookData.pages,
        bookCover: bookData.image,
        readLink: bookData.link,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    })
  })

  context("PUT /book/edit", () => {
    it("✏️📘 Should update the book information", () => {
      cy.request('PUT', '/book/edit', {
        currentTitle: bookData.title.current, 
        newBookName: bookData.title.new, 
        newBookauthor: bookData.author, 
        newBookPublisher: bookData.publisher, 
        newBookPages: bookData.pages, 
        newReadLink: bookData.link, 
        newBookCover: bookData.image
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('success', true)
      });
    })
  })

   context("DELETE /book/del", () => {
    it("🗑️📘 Should delete the newly created book", () => {
      cy.request('DELETE', '/book/del', {
        title: bookData.title.new, 
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    })
  })

    context("POST /logout", () => {
    it("🚪🔓 Should clear session and log out the user", () => {
      cy.request('POST', '/logout', {
        title: bookData.title.current, 
      }).then((response) => {
        cy.getCookie('session').should('not.exist')
        expect(response.status).to.eq(200);
      });
    })
  })
});
