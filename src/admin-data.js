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
        ]

    }


export default ADMIN_DATA