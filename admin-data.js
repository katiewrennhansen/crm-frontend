const ADMIN_DATA = 
    {
        promotions: [
            {
                promotion: {
                    typepromotion: 'Festive Fall',
                    totalcost: '$1,200',
                    startdate: '10/2/2019',
                    duedate: '10/2/2019',
                    company_id: 6,
                    user_id: 1,
                    id: 1
                }
            },
            {
                promotion: {
                    typepromotion: 'Summer Special',
                    totalcost: '$13,560',
                    startdate: '6/10/2019',
                    duedate: '8/12/2019',
                    company_id: 6,
                    user_id: 1,
                    id: 2
                }
            }
        ],
        commentsType: [
            {
                commtype: {
                    commdesc: 'Rent',
                    company_id: 6,
                },
                user_id: 1,
                id: 1,
                dateCreated: '8/2/2019' 
            },
            {
                commtype: {
                    commdesc: 'Maintenance',
                    company_id: 6,
                },
                user_id: 1,
                id: 2,
                dateCreated: '8/10/2019' 
            },
        ],
        maintenanceType: [
            {
                mainttype: {
                    id: 1,
                    maintdesc: "Inspection",
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                mainttype: {
                    id: 2,
                    maintdesc: "Heating",
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                mainttype: {
                    id: 3,
                    maintdesc: "Plumbing",
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
        ],
        propertyFeatures: [
            {
                featuretype: {
                    id: 1,
                    featuredescr: 'Bedrooms',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                featuretype: {
                    id: 2,
                    featuredescr: 'Bathrooms',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                featuretype: {
                    id: 3,
                    featuredescr: 'Garage',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            }
        ],
        propertyStatus: [
            {
                status: {
                    id: 1,
                    statusdesc: 'Rented',
                    showInPortal: false,
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                status: {
                    id: 2,
                    statusdesc: 'Available',
                    showInPortal: false,
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                },
            },
            {
                status: {
                    id: 3,
                    statusdesc: 'Sold',
                    showInPortal: false,
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                },
            }  
        ],
        reminders: [
            {
                reminder: {
                    id: 1,
                    rtype: 'Annual Rent',
                    periodmonths: 12,
                    bodymessage: 'Congrats you have rented for a year',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                reminder: {
                    id: 2,
                    rtype: 'Happy Birthday',
                    periodmonths: 12,
                    bodymessage: 'Happy Birthday!',
                    company_id: 6,
                    user_id: 1
                }
                
            },
        ],
        customerStatus: [
            {
                cstatus: {
                    id: 1,
                    cdesc: 'On Hold',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                },
            }, 
            {
                cstatus: {
                    id: 2,
                    cdesc: 'Active',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                },
            },
            {
                cstatus: {
                    id: 3,
                    cdesc: 'Inactive',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                },    
            }
        ],
        process: [
            {
                ptype: {
                    id: 1,
                    title: 'Sell',
                    steps : {
                        a: 'Visit',
                        b: 'Apply',
                        c: 'Offer',
                        d: 'Close'
                    },
                    dateCreated: '8/10/2019',                    
                    company_id: 6,
                    user_id: 1

                }
            },
            {
                ptype: {
                    id: 2,
                    title: 'Short-Term Rent',
                    steps : {
                        a: 'Visit',
                        b: 'Apply',
                        c: 'Sign Contract'
                    },
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1

                }
            },
            {
                ptype: {
                    id: 3,
                    title: 'Long-Term Rent',
                    steps : {
                        a: 'Visit',
                        b: 'Apply',
                        c: 'Sign Contract'
                    },
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1

                }
            },
        ],
        customerAccounts: [
            {
                customer: {
                    id: 1,
                    name: 'Jane Smith',
                    email: 'jsmith@gmail.com',
                    phone: '123-456-3454',
                    status: 'Active',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                customer: {
                    id: 2,
                    name: 'John Smith',
                    email: 'john.smith@gmail.com',
                    phone: '456-465-3454',
                    status: 'Active',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
            {
                customer: {
                    id: 3,
                    name: 'Katie Hansen',
                    email: 'customer@gmail.com',
                    phone: '789-563-4554',
                    status: 'Inactive',
                    dateCreated: '8/10/2019',
                    company_id: 6,
                    user_id: 1
                }
            },
        ]

    }


export default ADMIN_DATA