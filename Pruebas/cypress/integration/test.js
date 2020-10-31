describe("Pruebas Login Page ", () =>{
    it("Login", () =>{
        cy.visit("http://localhost:4000");
    })
})

describe("Server Response GET", ()=>{
    beforeEach(()=>{
        cy.setCookie('session', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoxMn19') 
        cy.setCookie("session.sig", 'IL-dJhSzie8AD75LhQXfYbRRG40')
    })

    it("Landing Page", () =>{
        cy.visit("http://localhost:3000")
    })
    
    it("Current Session", () =>{
        cy.request("GET", "http://localhost:4000/auth/office365/success").then((response) =>{
            expect(response).to.have.property("status", 200)
        })
    })

    it("All Classrooms Admin", () =>{
        cy.request("GET", "http://localhost:4000/adminCampus/allClassrooms").then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("All Users", () =>{
        cy.request("GET", "http://localhost:4000/adminCampus/allUsers/").then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("All Classes", () =>{
        cy.request("GET", "http://localhost:4000/staff/allClasses").then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("All Favorite", () =>{
        cy.request("GET", "http://localhost:4000/staff/allFavorites").then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })


})

describe("Server Response POST", ()=>{
    beforeEach(()=>{
        cy.setCookie('session', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoxMn19') 
        cy.setCookie("session.sig", 'IL-dJhSzie8AD75LhQXfYbRRG40')
    })
    
    
    it("Create Classroom", () =>{
        const classRoom = {name: "R3", capacity: "200", building: "10", features: "AC" }
        cy.request("POST", "http://localhost:4000/adminCampus/createNewClassroom", classRoom).then((response) =>{
            expect(response).to.have.property("status", 200)
        })
    })
    
    it("Update Classroom", () =>{
        const classRoom = {name: "R3", capacity: "200", building: "10", features: "AC" }
        cy.request("POST", "http://localhost:4000/adminCampus/updateClassroom/1",classRoom).then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("Delete Classroom", () =>{
        cy.request("POST", "http://localhost:4000/adminCampus/deleteClassroom/1").then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("Search Classroom", () =>{
        const searchClassroom = { searchQuery: "F201" }
        cy.request("POST", "http://localhost:4000/adminCampus/searchClassroom/", searchClassroom).then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("Update User Role", () =>{
        const newRole = { newRole:'admin' }
        cy.request("POST", "http://localhost:4000/adminCampus/updateUserRole/1", newRole).then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("Delete Class", () =>{
        cy.request("POST", "http://localhost:4000/adminDep/deleteClass/5").then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })

    it("Search Class", () =>{
        const searchClass = { searchQuery: "Phy" }
        cy.request("POST", "http://localhost:4000/staff/searchClass/", searchClass).then((response) =>{
            console.log(response)
            expect(response).to.have.property("status", 200)
        })
    })
})

describe("Manage Classrooms Button", ()=>{
    beforeEach(()=>{
        cy.setCookie('session', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoxMn19') 
        cy.setCookie("session.sig", 'IL-dJhSzie8AD75LhQXfYbRRG40')
    })
    it("Go To Button", ()=>{
        cy.get(':nth-child(1) > .css-1ecn6pr').click();
    })
    it("Go To Schedule", ()=>{
        cy.get(':nth-child(1) > .css-2tp4kf > .css-172bykr > .css-sh3nt').click();
    })
    it("Return to Dashboard", ()=>{
        cy.get('a').click();
    })

})

/
describe("Manage Users Button", ()=>{
    beforeEach(()=>{
        cy.setCookie('session', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoxMn19') 
        cy.setCookie("session.sig", 'IL-dJhSzie8AD75LhQXfYbRRG40')
    })
    it("Go To Button", ()=>{
        cy.get(':nth-child(2) > .css-1ecn6pr').click()
    })
    it("Go To Update Role to DashBoard", ()=>{
        cy.get(':nth-child(1) > .css-11kvngy > .css-172bykr > .css-u8wzfl').click();
        cy.get('[mb="2"]').click();
    })
})


describe("Manage Classes Button", ()=>{
    beforeEach(()=>{
        cy.setCookie('session', 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoxMn19') 
        cy.setCookie("session.sig", 'IL-dJhSzie8AD75LhQXfYbRRG40')
    })
    it("Go To Button", ()=>{
        cy.get(':nth-child(3) > .css-1ecn6pr').click()
    })
    it("Go To Schedule and Back to DashBoard", ()=>{
        cy.get('.css-12id7lw').click();
    })
    it("Return to Dashboard",() =>{
        cy.get('a').click()
    })
})