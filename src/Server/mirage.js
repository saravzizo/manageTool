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
                { key: 1, name: "John Doe", designation: "CEO", team: "not applicable", parent:"0" },
                { key: 2, name: "Mark Hill", designation: "Manager", team: "Dev", parent:"1" },
                { key: 3, name: "Joe Smith", designation: "Manager", team: "Test", parent:"1" },

                { key: 4, name: "Kenny Rogers", designation: "Senior Developer", team: "Dev", parent:"2" },
                { key: 5, name: "John Bon Jovi", designation: "Senior Developer", team: "Dev", parent:"2" },
                { key: 6, name: "Steven Tyler", designation: "Senior Developer", team: "Dev", parent:"2" },

                { key: 7, name: "Mick Jagger", designation: "Junior Developer", team: "Dev", parent:"4" },
                { key: 8, name: "Robert Plant", designation: "Junior Developer", team: "Dev", parent:"5" },
                { key: 9, name: "Axl Rose", designation: "Junior Developer", team: "Dev", parent:"5" },
                { key: 10, name: "Freddie Mercury", designation: "Junior Developer", team: "Dev", parent:"6" },
                { key: 11, name: "David Bowie", designation: "Junior Developer", team: "Dev", parent:"6" },
                { key: 12, name: "Mick Jagger", designation: "Junior Developer", team: "Dev", parent:"5" },
                { key: 13, name: "Robert Plant", designation: "Junior Developer", team: "Dev", parent:"4" },

                { key: 14, name: "Axl Rose", designation: "Fresher Developer", team: "Dev", parent:"9" },
                { key: 15, name: "Freddie Mercury", designation: "Fresher Developer", team: "Dev", parent:"10"},
                { key: 16, name: "Syd Barrett", designation: "Fresher Developer", team: "Dev", parent:"7" },
                { key: 17, name: "Roger Waters", designation: "Fresher Developer", team: "Dev", parent:"7" },
                { key: 18, name: "David Gilmour", designation: "Fresher Developer", team: "Dev", parent:"8" },
                { key: 19, name: "Nick Mason", designation: "Fresher Developer", team: "Dev", parent:"8" },

                { key: 20, name: "Richard Wright", designation: "Intern Developer", team: "Dev", parent:"14" },
                { key: 21, name: "Syd Barrett", designation: "Intern Developer", team: "Dev", parent:"15" },
                { key: 22, name: "Roger Waters", designation: "Intern Developer", team: "Dev", parent:"18" },
                { key: 23, name: "David Gilmour", designation: "Intern Developer", team: "Dev", parent:"19" },

                { key: 24, name: "Nick Mason", designation: "Senior Tester", team: "Test", parent:"3" },
                { key: 25, name: "Richard Wright", designation: "Senior Tester", team: "Test", parent:"3" },

                { key: 26, name: "Syd Barrett", designation: "Junior Tester", team: "Test", parent:"24" },
                { key: 27, name: "Roger Waters", designation: "Junior Tester", team: "Test", parent:"24" },
                { key: 28, name: "David Gilmour", designation: "Junior Tester", team: "Test", parent:"25" },

                { key: 29, name: "Nick Mason", designation: "Intern Tester", team: "Test", parent:"26" },
                { key: 30, name: "Richard Wright", designation: "Intern Tester", team: "Test", parent:"28" },


             
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

        server.post("/newEmployee", (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            console.log(attrs)
            let res = schema.db.employees.insert(attrs);
            return res;
        });

        // patch request for updating employee

        server.put("/employees/:id", (schema, request) => {
            let id = request.params.id;
            let attrs = JSON.parse(request.requestBody);
            console.log(attrs);
            let res = schema.db.employees.update(id, attrs);

            return res;

        }
        );





    return server;
};


