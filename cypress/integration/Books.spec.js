describe('Authorization', () => {
    it("Should open page", () => {
      cy.visit("/");
      cy.contains('Books list');
  });
   
    it("Should successfully login", () => {
      cy.visit("/");
      cy.login("bropet@mail.ru", "123");
      cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });
    
    it("Should not login with empty login", () => {
      cy.visit("/");
      cy.contains("Log in").click();
      cy.get("#mail").type(" ");
      cy.get("#pass").type("123");
      cy.contains("Submit").click();
      cy.checkIfElementInvalid('#mail');
  });
    
    it("Should not login with empty password", () => {
      cy.visit("/");
      cy.contains("Log in").click();
      cy.get("#mail").type("bropet@mail.ru");
      cy.contains("Submit").click();
      cy.checkIfElementInvalid('#pass');
      })
  });
  
  describe('Add book', () => {
    beforeEach(() => {
      cy.visit("/");
          cy.login("bropet@mail.ru", "123");
          cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
      });
  
    it("Should successfully add book", () => {
      cy.addNewBook("Пеппи Длинныйчулок", "Детская приключенческая повесть", "Астрид Линдгрен");
      cy.contains("Пеппи Длинныйчулок").should("be.visible");
    });
  
    it("Should successfully add book to favorite", () => {
      cy.addBookToFavorite("Малыш и Карлсон", "Сказочно-приключенческая повесть", "Астрид Линдгрен");
      cy.contains("Малыш и Карлсон").should("be.visible");
    });
  
    it("Should successfully deleted book from favorite", () => {
      cy.addBookToFavorite("Братья Львиное сердце", "Сказочно-приключенческая повесть", "Астрид Линдгрен");
      cy.contains('Delete from favorite').should('be.visible');
    });
  });