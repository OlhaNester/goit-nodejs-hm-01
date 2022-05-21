const contactOperation = require("./contacts");
const { Command } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactOperation.listContacts();
      console.log(contacts);
      break;
    case "get":
      const contactById = await contactOperation.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} is not found`);
      }
      console.log(contactById);
      break;
    case "add":
      const newContact = await contactOperation.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contactOperation.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
