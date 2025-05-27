const expectedKeys = [
    "uid",
    "displayName",
    "email",
    "emailVerified",
    "creationTime",
    "lastSignInTime",
    "tokensValidAfterTime",
    "disabled"
]

export function verifyKeysUsers(body) {
    if (body && Object.prototype.hasOwnProperty.call(body, 'users') && Array.isArray(body.users)) {
        body.users.forEach(keys => {
            expectedKeys.forEach(key => {
                expect(keys).to.have.property(key)
            })
        })
    } else {
        cy.log("{users[]} is not available or it's not an array.")
        throw new Error('"users" is either missing or not an array');
    }
}

const keysUserData = [
    "photoURL",
    "displayName",
    "email"
]

export function verifyKeysUsersData(body) {
    if (body && typeof body === 'object') {
        keysUserData.forEach(key => {
            expect(body).to.have.property(key);
        });
    }else {
      throw new Error('"users" is either missing or not an array');
    }
}

const books = [
    "name",
    "author",
    "publisher",
    "pages",
    "cover",
    "readLink",
    "bookDataCreation"
]

export function verifyKeysBooks(body) {
    if (body.ALLBOOKS && typeof body === 'object') {
        body.ALLBOOKS.forEach(keys => { 
            books.forEach(key => {
                expect(keys).to.have.property(key);
            });
        })
    }else {
      throw new Error('"users" is either missing or not an array');
    }
}

const lastBook = [
    "bookName",
    "bookAuthor",
    "bookPublisher",
    "numberOfPages",
    "readLink",
    "bookCover",
    "bookDataCreation"
]

export function verifyKeyBook(body) {
    if (body && typeof body === 'object') {
        lastBook.forEach(key => {
            expect(body).to.have.property(key);
        });
    } else {
        throw new Error('"users" is either missing or not an array');
    }
}

export function formatDate(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = today.getFullYear();
    const formatedDate = day + '-' + month + '-' + year;
    
    return formatedDate
}


