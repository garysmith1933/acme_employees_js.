const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

// // spacer('findEmployeeByName Moe')
// // // given a name and array of employees, return employee

function findEmployeeByName(employee, employees) {
    for (let i = 0; i < employees.length; i++) {
        let obj = employees[i]
        
        if (obj.hasOwnProperty('name')) {
            if (obj['name'] === employee) {
                return obj;
            }
        }
    }
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
function findManagerFor(employee, employees) {

let manager;
    console.log(employee)

    console.log(employee['managerId'])

  employees.forEach(worker => {
      if (worker.hasOwnProperty('id')) {
        //   if the employee manager id matches the works id 
          if (employee['managerId'] === worker['id'])  {
              manager = worker;
          }
      }
  })
    return manager;
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

function findCoworkersFor(employee, employees) {
    let sameManager = [];
    
    
  
    employees.forEach(worker => {
        console.log(worker['managerId'])
        if (employee !== worker) {
              
            if (employee['managerId'] === worker['managerId']) {
                sameManager.push(worker);
            }
        }
    })
    
    return sameManager;
}
//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 

function findManagementChainForEmployee(employee, employees) {
    let reportsTo = [];
    
    if (employee.name === 'moe') {
      return [];
    }
    
    else {
      reportsTo.push(findEmployeeByName('moe',employees))
    }

    
    let idNumber = reportsTo.map(worker => worker.id);
    let mostRecentId = idNumber[0];
    
    // we need tok make sure no duplicates are getting in
     for (let i = 0; i < employees.length; i++) {
       let worker = employees[i]
    
        if (mostRecentId === worker.managerId) {
      
          if (worker.name === employee.name) return reportsTo;
       
          reportsTo.push(worker)
          mostRecentId = worker.id;
        }
     }
    
    
    return reportsTo;
}

console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.

function generateManagementTree(employees) {
  
  // I do not take credit for this solution as Jacob had posted it in the slack channel. I just have it here to study it better.
  let boss = []
  
  for (let i = 0; i < employees.length; i++) {
    let worker = employees[i]
    
    // if the worker does not have a manager id, it has to be the boss.
    if (!worker.managerId) {
      boss = worker;
    }
  // added a reports property for boss to equal the result of the callback function that gets other subtrees.
    boss.reports =  findMinionsForManager(employees, boss);
   
    // this is the entire tree
    const companyHierarchy = boss;
  return companyHierarchy;
}
    
  }
  
  const findMinionsForManager = (employees, manager) => {
    const subtree = [];
    
      // it goes through the array of employees to see who reports directly to the manager/boss
    employees.filter(person => person.managerId === manager.id)

  //assigns reports property to each employee and recursively calls the function to find their minions
  
  // for each person that reports to the manager/boss they get a reports property that calls back the function itself to find those below them.
  .forEach( person => {
    person.reports = findMinionsForManager(employees, person);
    // pushes the person object to the array, adding to (both)? the bosses report property and the manager.
    subtree.push(person);
  })
  
  return subtree;
}
  

console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');



// spacer('displayManagementTree')
// //given a tree of employees, generate a display which displays the hierarchy

// I do not know..


// displayManagementTree(generateManagementTree(employees));/*
// moe
// -larry
// --shep
// ---shep Jr.
// -curly
// --groucho
// ---harpo
// -lucy
// */