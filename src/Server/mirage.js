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
                { id: 8, name: "John Hill", designation: "Tester", team: "Testing", manager:"3"},
                { id: 9, name: "Mark Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 10, name: "Jane Hill", designation: "Developer", team: "Development", manager:"2" },
                { id: 11, name: "John Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 12, name: "Mark Hill", designation: "Developer", team: "Development", manager:"2" },
                { id: 13, name: "Jane Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 14, name: "John Hill", designation: "Tester", team: "Testing", manager:"1" },
                { id: 15, name: "Mark Smith", designation: "Tester", team: "Testing", manager:"1" },
                { id: 16, name: "Jane Hill", designation: "Tester", team: "Testing", manager:"1" },
                { id: 17, name: "John Smith", designation: "Tester", team: "Testing", manager:"1" },
                { id: 18, name: "Mark Doe", designation: "Developer", team: "Development", manager:"2" },
                { id: 19, name: "Jane Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 20, name: "John Hill", designation: "Developer", team: "Development", manager:"2" },
                { id: 21, name: "Mark Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 22, name: "Jane Hill", designation: "Developer", team: "Development", manager:"2" },
                { id: 23, name: "John Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 24, name: "Mark Hill", designation: "Developer", team: "Development", manager:"2" },
                { id: 25, name: "Jane Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 26, name: "John Hill", designation: "Tester", team: "Testing", manager:"1" },
                { id: 27, name: "Mark Smith", designation: "Tester", team: "Testing", manager:"1" },
                { id: 28, name: "Jane Hill", designation: "Tester", team: "Testing", manager:"1" },
                { id: 29, name: "John Smith", designation: "Tester", team: "Testing", manager:"1" },
                { id: 30, name: "Mark Doe", designation: "Developer", team: "Development", manager:"2" },
                { id: 31, name: "Jane Smith", designation: "Developer", team: "Development", manager:"2" },
                { id: 32, name: "John Hill", designation: "Developer", team: "Development", manager:"2" },
                { id: 33, name: "Mark Smith", designation: "Developer", team: "Development",manager:"2" },
            ]
        });


        server.get("/employees", (schema) => {

            let res =[]
            res = schema.db.employees;
            if(res.length === 0){
                return {message: "No employees found"};
            }
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


        // patch request for updating employee




    return server;
};


