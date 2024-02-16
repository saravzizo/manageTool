import { createServer } from "miragejs";
export function makeServer() {

    let server = createServer(
        {

            routes() {
                this.namespace = "api";
                this.resource("employees");
            },
        }
    );

        server.db.loadData({
            employees: [
                { id: 1, name: "John Doe", designation: "CEO", team: "not applicable", manager:"-1" },
                { id: 2, name: "Mark Hill", designation: "Manager", team: "Development", manager:"1" },
                { id: 3, name: "Joe Smith", designation: "Manager", team: "Testing", manager:"1" },
                { id: 4, name: "Jane Doe", designation: "Developer", team: "Development", manager:"2" },
                { id: 5, name: "John Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 6, name: "Mark Doe", designation: "Tester", team: "Testing", manager:"3" },
                { id: 7, name: "Jane Smith", designation: "Tester", team: "Testing", manager:"3" },
            ]
        });


        server.get("/employees", (schema) => {

            let res =[]
            res = schema.db.employees;
            return res;
        });
        
        server.get("/employees/CEO", (schema, request) => {
            let res =[]
            res = schema.db.employees.where({designation: "CEO"});
            return res;
        });

        server.get("/employees/Manager", (schema, request) => {
            let res =[]
            res = schema.db.employees.where({designation: "Manager"});
            return res;
        });

        server.get("/employees/Developer", (schema, request) => {
            let res =[]
            res = schema.db.employees.where({designation: "Developer"});
            return res;
        });

        server.get("/employees/Tester", (schema, request) => {
            let res =[]
            res = schema.db.employees.where({designation: "Tester"});
            return res;
        });



    return server;
};


