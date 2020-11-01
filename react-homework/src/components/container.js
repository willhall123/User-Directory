import React, { Component } from "react";
import Results from "./result";
import Search from "./search";
import api from "../utils/api";

class SearchResultContainer extends Component {
    state= {
            search: "",
            employee: [],
            results: [],
            error: ""
    };
    componentDidMount() {
        api.getEmployees().then(res => {
            const data = res.data.results;
            const employeeData = [];
            for (var i =0; i < data.length; i++) {
                employeeData.push({
                    firstName: data[i].name.first,
                    lastName: data[i].name.last,
                    email: data[i].email,
                    picture: data[i].picture.thumbnail,
                    phone: data[i].cell
                });
            }
            this.setState({employee: employeeData, results: employeeData});
            this.sortEmployees();
        })
        .catch(function(err){
            console.log(err);
        });      
    }
    sortEmployees() {
        const employees = this.state.results;
        employees.sort(function (a, b) {
            var nameOne = a.firstName.toLowerCase();
            var nameTwo = b.firstName.toLowerCase();
            return (nameOne < nameTwo) ? -1 : (nameOne > nameTwo) ? 1 : 0; 
        }).then(this.setState({employee: employees})
        );
    };
    searchEmployee = function (value) {
        const employees = this.state.results;
        const searchEmployee = [];
        const search = value;
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].firstName.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                searchEmployee.push(employees[i]);
            }
        this.setState({ employee: searchEmployee });
        }
    };    

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({search: value});
        return this.searchEmployee(value);
    };

    render() { 
        return (
            <div>
                <h1>Employee Directory</h1>
                <Search
                    handleInputChange={this.handleInputChange}
                />
                <div>
                    <h2>searching for:</h2>
                    <span>{this.state.search}</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employee.map((employee, key) => {
                            return (<Results
                                firstName={employee.firstName}
                                lastName={employee.lastName}
                                email={employee.email}
                                phone={employee.phone}
                                picture={employee.picture}
                                key={key}
                            />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchResultContainer;