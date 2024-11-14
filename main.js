// Вам даны примеры кода. Необходимо:
// Понять, какой принцип нарушен в каждой задаче;
// Написать правильное решение, не нарушая принципы SOLID.


/*
Задача 1:
*/
class EmailService {
    sendMessage(message) {
        console.log(`Отправка email с сообщением: ${message}`);
    }
 }
 
 class Notification {
    constructor() {
        this.emailService = new EmailService();
    }
 
    notify(message) {
        this.emailService.sendMessage(message);
    }
 }
 
 // Использование
 let notification = new Notification();
 notification.notify("Важное сообщение");

 /*
    Данный код нарушает принцип инверсии зависимостей, так как класс "Notification" зависит от класса "EmailService",
    а не от какого либо абстрактного интерфейса. Это мешает возможности изменения функционала, например, если мы захотим потом изменить текст,
    с которым приходит уведомление или указывать ещё отправителя, то для этого придётся изменять метод sendMessage().
    
 Исправленный вариант:
 */

class IMessageService {
    sendMessage(message) {
        console.log('Необходимо реализовать метод отправки сообщения');
    }
}

class NewEmailService extends IMessageService {
    sendMessage(message) {
        console.log(`Пришло сообщение ${message}`);
    }
}

class NewNotificationService extends IMessageService {
    sendMessage(message) {
        console.log(`Вам пришло сообщение! \n Текст сообщения: ${message}`);
    }

    notify(message) {
        console.log(this.sendMessage(message));
    }
}

//Использование
let emailService = new NewEmailService();
notification = new NewNotificationService();


/*
    Теперь метод sendMessage() прописывается в интерфейсе IMessageService, что позволяет реализующим его классам задавать свою реализацию данного метода,
    потому что уведомления могут содержать дополнительную информацию. (И вообще странно, что в первоначальном варианте кода из задачи функция notify(),
    что должна отвечать за уведомление, делает то же самое, что и функция отправки. Может быть из-за этого я неверно понял суть кода в условии задачи).
*/

/*
    Задача 2:
*/

class Bird {
    fly() {
        console.log("Птица летит");
    }
 }
 class Duck extends Bird { }
 class Penguin extends Bird {
    fly() {
        throw new Error("Пингвины не умеют летать");
    }
 }
 // Использование
 const birds = [new Duck(), new Penguin()];
 birds.forEach(bird => bird.fly());

/*
    Этот код нарушает принцип подстановки Барбары Лисков. Каждый из классов наследников должен реализовать полный функционал родительского класса.
    Здесь класс Penguin наследуется от класса Bird, а объект класса Penguin не может корректно выполнить метод, прописанный в родителе.

    Решением может быть создание двух классов для летающих и нелетающих птиц или же оставить класс для отображения таких полей, которые ТОЧНО будут
    отражать общие свойства всех видов птиц.
    Исправленный код:
*/

class NewBird {
    // Либо только поля, по типу вес, рост, размах крыла, либо методы по типу eat(), sleep() и т.д.
    move() {
        console.log('Птица меняет своё положение в пространстве')
    }
}

class NewDuck extends NewBird {
    move() {
        console.log('Утка летит');
    }
}

class NewPenguin extends NewBird {
    move() {
        console.log('Пингвин скользит на пузяке');
    }
}

// Использование
const newBirds = [new Duck(), new Penguin()];
newBirds.forEach(bird => bird.move());


/*
    Задача 3:
*/

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
 
    getName() {
        return this.name;
    }
    save() {
       console.log(`Сохранение пользователя ${this.name} в базу данных`);
    }
}
 // Использование
 const user = new User("Алексей", 30);
 user.save();
 
/*
    Данный код нарушает принцип единой ответственности. Каждый класс должен реализовать функционал только подходящий ему по смыслу.
    В данном случае метод save() является лишним, т.к. сам пользоваетль не должен отвечать за его сохранение в базу данных.
*/

class NewUser {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
 
    getName() {
        return this.name;
    }
}

class UserRecordService {
    save(user){
        console.log(`Сохранение пользователя ${user.name} в базу данных`);
    }
}

/*
    Реализуем функционал сохранения пользователя в БД в отдельном классе
*/