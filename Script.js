class Employee {
    constructor(name, dept = "general") {
        this.name = name;
        this.dept = dept;
    }

    get Dept() {
        return this.dept;
    }

    setDept(dept) {
        this.dept = dept;
    }
}

class Manager extends Employee {
    constructor(name, dept, reports = []) {
        super(name, dept);
        this.reports = reports;
    }
}

class WorkerBee extends Employee {
    constructor(name, dept, projects = []) {
        super(name, dept);
        this.projects = projects;
    }
}

class SalesPerson extends WorkerBee {
    constructor(name, dept, projects, quota = 100) {
        super(name, dept, projects);
        this.quota = quota;
    }
}
var rect = new SalesPerson("","sales", [], [""], 100);
class Engineer extends WorkerBee {
    constructor(name, dept, projects, quota, machine = "") {
        super(name, dept, projects, quota);
        this.machine = machine;
    }
}
var Aman = new SalesPerson("", "Engineering", [], [""], 100);
console.log(Aman.dept);
