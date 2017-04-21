import { Mongo } from 'meteor/mongo';

Students = new Mongo.Collection('students');

//All below is schema for Mongodb, Collection Students
StudentSchema = new SimpleSchema({
    Name: {
        type: String,
        max: 50,
        label: 'Name *',
        autoform:
        {
            placeholder: "First and last name"
        }
    },

    PhoneNumber: {
        type: String,
        unique: true,
        min: 12,
        max: 12,
        label: 'Phone Number *',
        autoform:
        {  
            type: 'intl-tel',
            class: 'form-control',
            intlTelOptions: {
                autoFormat: true,
                defaultCountry: 'US',
                utilsScript: 'lib/libphonenumber/build/utils.js'
            }
        }
       
    },

    USCID: {
        type: String,
        min: 9,
        max: 9,
        label: 'USC ID *',
        autoform:
        {
            placeholder: "Located on the back of your Carolina Card"
        }
    },

    ReasonForVisit: {
        type: String,
        allowedValues: ["Change Major", "Add Major/Minor", "Other"],
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Reason)"
            }
        },
        label: 'Reason for Visit *'
    },

    CurrentMajor: {
        type: String,
        max: 100,
        label: 'Current Major *',
        regEx:/^([^0-9]*)$/,
        autoform: {
            type: "typeahead",
                options: function () {
                    return [
                        {label: "Accounting", value: "Accounting"},	 	
                        {label: "Advertising", value: "Advertising"},		 	 	 
                        {label: "African American Studies", value: "African American Studies"},		 	 	 
                        {label: "Anthropology", value: "Anthropology"},				
                        {label: "Art Education", value: "Art Education"},			 	 
                        {label: "Art History", value: "Art History"},			 	 
                        {label: "Art Studio", value: "Art Studio"},			 	 
                        {label: "Athletic Training", value: "Athletic Training"},			 	 
                        {label: "Biochemistry and Molecular Biology", value: "Biochemistry and Molecular Biology"},	 	 
                        {label: "Biological Sciences", value: "Biological Sciences"},
                        {label: "Biomedical Sciences", value: "Biomedical Sciences"},	 			 
                        {label: "Biostatistics", value: "Biostatistics"},	 			 
                        {label: "Business Administration", value: "Business Administration"}, 			 
                        {label: "Cardiovascular Technology", value: "Cardiovascular Technology"},		 	 	 
                        {label: "Chemistry", value: "Chemistry"},				 
                        {label: "Chinese Studies", value: "Chinese Studies"},	 	 	 
                        {label: "Classics", value: "Classics"},	 	 	 
                        {label: "Communication Sciences and Disorders", value: "Communication Sciences and Disorders"},	 
                        {label: "Comparative Literature", value: "Comparative Literature"},
                        {label: "Computer Science / Computer Engineering", value: "Computer Science / Computer Engineering"},	
                        {label: "Counseling / Counselor Education", value: "Counseling / Counselor Education"},
                        {label: "Creative Writing	", value: "Creative Writing"},
                        {label: "Criminology and Criminal Justice", value: "Criminology and Criminal Justice"},			
                        {label: "Dance", value: "Dance"},
                        {label: "Economics", value: "Economics"},				
                        {label: "Education: Curriculum and Instruction", value: "Education: Curriculum and Instruction"}, 	 	 
                        {label: "Education: Early Childhood Education", value: "Education: Early Childhood Education"},
                        {label: "Education: Elementary Education", value: "Education: Elementary Education"},			 
                        {label: "Education: Language and Literacy", value: "Education: Language and Literacy"},		 
                        {label: "Education: Middle Level Education", value: "Education: Middle Level Education"},	 	 
                        {label: "Education: Physical Education", value: "Education: Physical Education"},		 
                        {label: "Education: Secondary Education", value: "Education: Secondary Education"},	 	 
                        {label: "Education: Special Education", value: "Education: Special Education"},	 			 
                        {label: "Education: Teacher Education", value: "Education: Teacher Education"},	 			
                        {label: "Educational Administration and Higher Education", value: "Educational Administration and Higher Education"},	 			 
                        {label: "Educational Psychology and Research", value: "Educational Psychology and Research"},	 
                        {label: "Educational Technology", value: "Educational Technology"}, 		 	 
                        {label: "Engineering: Aerospace Engineering", value: "Engineering: Aerospace Engineering"},	 	 
                        {label: "Engineering: Biomedical Engineering", value: "Engineering: Biomedical Engineering"},		
                        {label: "Engineering: Chemical Engineering", value: "Engineering: Chemical Engineering"},			
                        {label: "Engineering: Civil Engineering", value: "Engineering: Civil Engineering"},			
                        {label: "Engineering: Electrical Engineering", value: "Engineering: Electrical Engineering"},			
                        {label: "Engineering: Engineering Management", value: "Engineering: Engineering Management"},	 	
                        {label: "Engineering: Mechanical Engineering", value: "Engineering: Mechanical Engineering"},		
                        {label: "Engineering: Nuclear Engineering", value: "Engineering: Nuclear Engineering"},	 		
                        {label: "Engineering: System Design", value: "Engineering: System Design"},	 	 
                        {label: "English", value: "English"},			 
                        {label: "Environmental Health Sciences", value: "Environmental Health Sciences"},			
                        {label: "Environmental Science / Environmental Studies", value: "Environmental Science / Environmental Studies"},	 	 
                        {label: "Epidemiology", value: "Epidemiology"},			
                        {label: "European Studies", value: "European Studies"},		 	 	 
                        {label: "Exercise Science", value: "Exercise Science"},			 
                        {label: "Film and Media Studies", value: "Film and Media Studies"},		 	 	 
                        {label: "Finance", value: "Finance"},	 	 	 
                        {label: "Foreign Language", value: "Foreign Language"},	 		 	 
                        {label: "French", value: "French"},
                        {label: "Geography", value: "Geography"},			 
                        {label: "Geological Sciences", value: "Geological Sciences"},			 
                        {label: "Geophysics", value: "Geophysics"}, 
                        {label: "German	", value: "German"}, 	 
                        {label: "Gerontology", value: "Gerontology"},	 	 	
                        {label: "Global Studies", value: "Global Studies"},	 	 	 
                        {label: "Health Communication", value: "Health Communication"}, 	 	
                        {label: "Health Information Technology", value: "Health Information Technology"}, 	  
                        {label: "Health Promotion, Education and Behavior", value: "Health Promotion, Education and Behavior"},	  
                        {label: "Health Services Policy and Management", value:	"Health Services Policy and Management"},
                        {label: "History", value: "History"},
                        {label: "Hospitality Management", value: "Hospitality Management"},				 
                        {label: "Human Resources", value: "Human Resources"},
                        {label: "Information Science", value: "Information Science"},	 	 
                        {label: "Integrated Information Technology", value: "Integrated Information Technology"},		 	 
                        {label: "Interdisciplinary Studies", value: "Interdisciplinary Studies"},
                        {label: "International Business", value: "International Business"},
                        {label: "International Studies", value: "International Studies"},
                        {label: "Journalism", value: "Journalism"},
                        {label: "Latin American Studies", value: "Latin American Studies"},		 	 	 
                        {label: "Law", value: "Law"},
                        {label: "Liberal Studies", value: "Liberal Studies"},		 	 	 
                        {label: "Library and Information Science", value: "Library and Information Science"},	 		
                        {label: "Linguistics", value: "Linguistics"},
                        {label: "Management", value: "Management"}, 	 	 
                        {label: "Marine Science", value: "Marine Science"},		 
                        {label: "Marketing", value: "Marketing"},	 
                        {label: "Mathematics", value: "Mathematics"},		 
                        {label: "Media Arts", value: "Media Arts"},	 	 
                        {label: "Medicine", value: "Medicine"}, 		 
                        {label: "Music", value: "Music"},	 	 
                        {label: "Music: Conducting", value: "Music: Conducting"},	 			 
                        {label: "Music: Jazz Studies", value: "Music: Jazz Studies"}, 	 
                        {label: "Music: Music Composition", value: "Music: Music Composition"},		 
                        {label: "Music: Music Education", value: "Music: Music Education"},			 
                        {label: "Music: Music History", value: "Music: Music History"}, 
                        {label: "Music: Music Pedagogy", value: "Music: Music Pedagogy"},	 
                        {label: "Music: Music Performance", value: "Music: Music Performance"},	
                        {label: "Music: Music Theory", value: "Music: Music Theory"},
                        {label: "Music: Opera Theatre", value: "Music: Opera Theatre"},	 
                        {label: "Nursing", value: "Nursing"},
                        {label: "Organizational Leadership", value: "Organizational Leadership"}, 	 	 
                        {label: "Pharmacy", value: "Pharmacy"},
                        {label: "Philosophy", value: "Philosophy"},		 
                        {label: "Physics", value: "Physics"}, 
                        {label: "Political Science", value: "Political Science"},		 		 
                        {label: "Professional Science Master", value: "Professional Science Master"}, 		 	 
                        {label: "Psychology", value: "Psychology"},
                        {label: "Public Administration", value: "Public Administration"},	 		 	 
                        {label: "Public Health", value: "Public Health"},
                        {label: "Public Relations", value: "Public Relations"},	 	 
                        {label: "Real Estate", value: "Real Estate"}, 	 
                        {label: "Religious Studies", value: "Religious Studies"},	 	 	 
                        {label: "Retailing", value: "Retailing"},	 
                        {label: "Risk Management and Insurance", value: "Risk Management and Insurance"},
                        {label: "Russian", value: "Russian"},
                        {label: "Social Work", value: "Social Work"},		  
                        {label: "Sociology", value: "Sociology"},		 
                        {label: "Spanish", value: "Spanish"}, 
                        {label: "Speech / Language Pathology", value: "Speech / Language Pathology"}, 		 	 
                        {label: "Sport and Entertainment Management", value: "Sport and Entertainment Management"},	 
                        {label: "Statistics", value: "Statistics"},
                        {label: "Theatre", value: "Theatre"}, 	 
                        {label: "Tourism Management", value: "Tourism Management"},		
                        {label: "Undeclared", value: "Undeclared"}, 	 	 
                        {label: "Visual Communications", value: "Visual Communications"}, 
                        {label: "Women' and Gender Studies", value: "Women’ and Gender Studies"}
                    ];
                }
        }
    },

    IntendedMajor: {
        type: String,
        optional: true,
        max: 100,
        label: 'Intended Major',
        autoform: {
            type: "typeahead",
                options: function () {
                    return [
                        {label: "Accounting", value: "Accounting"},	 	
                        {label: "Advertising", value: "Advertising"},		 	 	 
                        {label: "African American Studies", value: "African American Studies"},		 	 	 
                        {label: "Anthropology", value: "Anthropology"},				
                        {label: "Art Education", value: "Art Education"},			 	 
                        {label: "Art History", value: "Art History"},			 	 
                        {label: "Art Studio", value: "Art Studio"},			 	 
                        {label: "Athletic Training", value: "Athletic Training"},			 	 
                        {label: "Biochemistry and Molecular Biology", value: "Biochemistry and Molecular Biology"},	 	 
                        {label: "Biological Sciences", value: "Biological Sciences"},
                        {label: "Biomedical Sciences", value: "Biomedical Sciences"},	 			 
                        {label: "Biostatistics", value: "Biostatistics"},	 			 
                        {label: "Business Administration", value: "Business Administration"}, 			 
                        {label: "Cardiovascular Technology", value: "Cardiovascular Technology"},		 	 	 
                        {label: "Chemistry", value: "Chemistry"},				 
                        {label: "Chinese Studies", value: "Chinese Studies"},	 	 	 
                        {label: "Classics", value: "Classics"},	 	 	 
                        {label: "Communication Sciences and Disorders", value: "Communication Sciences and Disorders"},	 
                        {label: "Comparative Literature", value: "Comparative Literature"},
                        {label: "Computer Science / Computer Engineering", value: "Computer Science / Computer Engineering"},	
                        {label: "Counseling / Counselor Education", value: "Counseling / Counselor Education"},
                        {label: "Creative Writing	", value: "Creative Writing"},
                        {label: "Criminology and Criminal Justice", value: "Criminology and Criminal Justice"},			
                        {label: "Dance", value: "Dance"},
                        {label: "Economics", value: "Economics"},				
                        {label: "Education: Curriculum and Instruction", value: "Education: Curriculum and Instruction"}, 	 	 
                        {label: "Education: Early Childhood Education", value: "Education: Early Childhood Education"},
                        {label: "Education: Elementary Education", value: "Education: Elementary Education"},			 
                        {label: "Education: Language and Literacy", value: "Education: Language and Literacy"},		 
                        {label: "Education: Middle Level Education", value: "Education: Middle Level Education"},	 	 
                        {label: "Education: Physical Education", value: "Education: Physical Education"},		 
                        {label: "Education: Secondary Education", value: "Education: Secondary Education"},	 	 
                        {label: "Education: Special Education", value: "Education: Special Education"},	 			 
                        {label: "Education: Teacher Education", value: "Education: Teacher Education"},	 			
                        {label: "Educational Administration and Higher Education", value: "Educational Administration and Higher Education"},	 			 
                        {label: "Educational Psychology and Research", value: "Educational Psychology and Research"},	 
                        {label: "Educational Technology", value: "Educational Technology"}, 		 	 
                        {label: "Engineering: Aerospace Engineering", value: "Engineering: Aerospace Engineering"},	 	 
                        {label: "Engineering: Biomedical Engineering", value: "Engineering: Biomedical Engineering"},		
                        {label: "Engineering: Chemical Engineering", value: "Engineering: Chemical Engineering"},			
                        {label: "Engineering: Civil Engineering", value: "Engineering: Civil Engineering"},			
                        {label: "Engineering: Electrical Engineering", value: "Engineering: Electrical Engineering"},			
                        {label: "Engineering: Engineering Management", value: "Engineering: Engineering Management"},	 	
                        {label: "Engineering: Mechanical Engineering", value: "Engineering: Mechanical Engineering"},		
                        {label: "Engineering: Nuclear Engineering", value: "Engineering: Nuclear Engineering"},	 		
                        {label: "Engineering: System Design", value: "Engineering: System Design"},	 	 
                        {label: "English", value: "English"},			 
                        {label: "Environmental Health Sciences", value: "Environmental Health Sciences"},			
                        {label: "Environmental Science / Environmental Studies", value: "Environmental Science / Environmental Studies"},	 	 
                        {label: "Epidemiology", value: "Epidemiology"},			
                        {label: "European Studies", value: "European Studies"},		 	 	 
                        {label: "Exercise Science", value: "Exercise Science"},			 
                        {label: "Film and Media Studies", value: "Film and Media Studies"},		 	 	 
                        {label: "Finance", value: "Finance"},	 	 	 
                        {label: "Foreign Language", value: "Foreign Language"},	 		 	 
                        {label: "French", value: "French"},
                        {label: "Geography", value: "Geography"},			 
                        {label: "Geological Sciences", value: "Geological Sciences"},			 
                        {label: "Geophysics", value: "Geophysics"}, 
                        {label: "German	", value: "German"}, 	 
                        {label: "Gerontology", value: "Gerontology"},	 	 	
                        {label: "Global Studies", value: "Global Studies"},	 	 	 
                        {label: "Health Communication", value: "Health Communication"}, 	 	
                        {label: "Health Information Technology", value: "Health Information Technology"}, 	  
                        {label: "Health Promotion, Education and Behavior", value: "Health Promotion, Education and Behavior"},	  
                        {label: "Health Services Policy and Management", value:	"Health Services Policy and Management"},
                        {label: "History", value: "History"},
                        {label: "Hospitality Management", value: "Hospitality Management"},				 
                        {label: "Human Resources", value: "Human Resources"},
                        {label: "Information Science", value: "Information Science"},	 	 
                        {label: "Integrated Information Technology", value: "Integrated Information Technology"},		 	 
                        {label: "Interdisciplinary Studies", value: "Interdisciplinary Studies"},
                        {label: "International Business", value: "International Business"},
                        {label: "International Studies", value: "International Studies"},
                        {label: "Journalism", value: "Journalism"},
                        {label: "Latin American Studies", value: "Latin American Studies"},		 	 	 
                        {label: "Law", value: "Law"},
                        {label: "Liberal Studies", value: "Liberal Studies"},		 	 	 
                        {label: "Library and Information Science", value: "Library and Information Science"},	 		
                        {label: "Linguistics", value: "Linguistics"},
                        {label: "Management", value: "Management"}, 	 	 
                        {label: "Marine Science", value: "Marine Science"},		 
                        {label: "Marketing", value: "Marketing"},	 
                        {label: "Mathematics", value: "Mathematics"},		 
                        {label: "Media Arts", value: "Media Arts"},	 	 
                        {label: "Medicine", value: "Medicine"}, 		 
                        {label: "Music", value: "Music"},	 	 
                        {label: "Music: Conducting", value: "Music: Conducting"},	 			 
                        {label: "Music: Jazz Studies", value: "Music: Jazz Studies"}, 	 
                        {label: "Music: Music Composition", value: "Music: Music Composition"},		 
                        {label: "Music: Music Education", value: "Music: Music Education"},			 
                        {label: "Music: Music History", value: "Music: Music History"}, 
                        {label: "Music: Music Pedagogy", value: "Music: Music Pedagogy"},	 
                        {label: "Music: Music Performance", value: "Music: Music Performance"},	
                        {label: "Music: Music Theory", value: "Music: Music Theory"},
                        {label: "Music: Opera Theatre", value: "Music: Opera Theatre"},	 
                        {label: "Nursing", value: "Nursing"},
                        {label: "Organizational Leadership", value: "Organizational Leadership"}, 	 	 
                        {label: "Pharmacy", value: "Pharmacy"},
                        {label: "Philosophy", value: "Philosophy"},		 
                        {label: "Physics", value: "Physics"}, 
                        {label: "Political Science", value: "Political Science"},		 		 
                        {label: "Professional Science Master", value: "Professional Science Master"}, 		 	 
                        {label: "Psychology", value: "Psychology"},
                        {label: "Public Administration", value: "Public Administration"},	 		 	 
                        {label: "Public Health", value: "Public Health"},
                        {label: "Public Relations", value: "Public Relations"},	 	 
                        {label: "Real Estate", value: "Real Estate"}, 	 
                        {label: "Religious Studies", value: "Religious Studies"},	 	 	 
                        {label: "Retailing", value: "Retailing"},	 
                        {label: "Risk Management and Insurance", value: "Risk Management and Insurance"},
                        {label: "Russian", value: "Russian"},
                        {label: "Social Work", value: "Social Work"},		  
                        {label: "Sociology", value: "Sociology"},		 
                        {label: "Spanish", value: "Spanish"}, 
                        {label: "Speech / Language Pathology", value: "Speech / Language Pathology"}, 		 	 
                        {label: "Sport and Entertainment Management", value: "Sport and Entertainment Management"},	 
                        {label: "Statistics", value: "Statistics"},
                        {label: "Theatre", value: "Theatre"}, 	 
                        {label: "Tourism Management", value: "Tourism Management"},		
                        {label: "Undeclared", value: "Undeclared"}, 	 	 
                        {label: "Visual Communications", value: "Visual Communications"}, 
                        {label: "Women' and Gender Studies", value: "Women’ and Gender Studies"}
                    ];
                }
        }
    },

    Comments: {
        type: String,
        max: 300, 
        optional: true,
        label: 'Comments',
        //regEx: /^{1,10}\b/,
        autoform: {
            rows: 3
        }
    },

    Disclaimer: {
        type: Boolean,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "boolean-checkbox",
            }
        },
        label: "Opt in for text service *standard text rates may apply"
    },
   
    createdAt: {
        type: Date,
            autoform: {
                type: "hidden",
                label: false
            },
            autoValue: function() {
                if (this.isInsert) {
                    return new Date();
                } else if (this.isUpsert) {
                    return {$setOnInsert: new Date()};
                } 
            }
    },
  
    updatedAt: {
        type: Date,
            autoform: {
                type: "hidden",
                label: false
            },
            autoValue: function() {
                if (this.isUpdate) {
                    return new Date();
                }
            },
            denyInsert: true,
            optional: true
    },
    
    currentStatus: {
        type: String,
            autoform: {
                type: "hidden",
                label: false
            },
            autoValue: function() {
                if (this.isInsert) {
                    return "Waiting"
                }
            }
    },

    waitTime: {
        type: Number,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function() {    
            if(this.isInsert) {
                return 15*(Students.find().count());          
            }   
      }
    }
});

SimpleSchema.messages({
    required: "This field is required",
    "minString PhoneNumber": "Phone number must be 10 digits, please include area code.",
    "maxString PhoneNumber": "Phone number cannot exceed 10 digits.",
    "notUnique PhoneNumber": "This phone number already seems to be in our list. Make sure you are not already signed up for an appointment.",
    "minString USCID": "USC ID must be [min] characters",
    expectedString: "- is not allowed",
    "regEx PhoneNumber":
    [
        {
            msg: "Please use only numbers (803)-123-4567 is 8031234567"
        }
    ],
    "regEx CurrentMajor":[
        { 
            msg: "Numbers are not allowed in this field"
        }
    ],
    "regEx IntendedMajor":[
        {
            msg: "Numbers are not allowed in this field"
        }
    ]
});

Students.attachSchema(StudentSchema);
