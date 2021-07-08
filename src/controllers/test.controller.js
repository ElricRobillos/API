const db = require("../models");
const bcrypt = require("bcrypt");

// create user

exports.create = async (req, res) => {
    // if (req.user == null || req.user.userType != 'Librarian'){
    //     res.sendStatus(403);
    // }
    // else{
    //     req.body.addedBy = req.user.userID

    //     req.body.updatedBy = req.user.userID

    //     req.body.password = await bcrypt.hash(
    //         req.body.password, 
    //         parseInt(process.env.SALT_ROUND)
    //     );
        
        db.users.create(req.body)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ["A User is created successfully."],
            });
                
        })
        .catch((err) =>{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        });
    // }

};

// Populate countries
exports.populatePubCountries = (req, res) => {
    db.publication_countries
        .bulkCreate([
            {
                status: 'Active', 
                country: 'Afghanistan'
            }, {
                status: 'Active', 
                country: 'Åland Islands'
            }, {
                status: 'Active', 
                country: 'Albania'
            }, {
                status: 'Active', 
                country: 'Algeria'
            }, {
                status: 'Active', 
                country: 'American Samoa'
            }, {
                status: 'Active', 
                country: 'Andorra'
            }, {
                status: 'Active', 
                country: 'Angola'
            }, {
                status: 'Active', 
                country: 'Anguilla'
            }, {
                status: 'Active', 
                country: 'Antarctica'
            }, {
                status: 'Active', 
                country: 'Antigua and Barbuda'
            }, {
                status: 'Active', 
                country: 'Argentina'
            }, {
                status: 'Active', 
                country: 'Armenia'
            }, {
                status: 'Active', 
                country: 'Aruba'
            }, {
                status: 'Active', 
                country: 'Australia'
            }, {
                status: 'Active', 
                country: 'Austria'
            }, {
                status: 'Active', 
                country: 'Azerbaijan'
            }, {
                status: 'Active', 
                country: 'Bahamas'
            }, {
                status: 'Active', 
                country: 'Bahrain'
            }, {
                status: 'Active', 
                country: 'Bangladesh'
            }, {
                status: 'Active', 
                country: 'Barbados'
            }, {
                status: 'Active', 
                country: 'Belarus'
            }, {
                status: 'Active', 
                country: 'Belgium'
            }, {
                status: 'Active', 
                country: 'Belize'
            }, {
                status: 'Active', 
                country: 'Benin'
            }, {
                status: 'Active', 
                country: 'Bermuda'
            }, {
                status: 'Active', 
                country: 'Bhutan'
            }, {
                status: 'Active', 
                country: 'Bolivia (Plurinational State of)'
            }, {
                status: 'Active', 
                country: 'Bonaire, Sint Eustatius and Saba'
            }, {
                status: 'Active', 
                country: 'Bosnia and Herzegovina'
            }, {
                status: 'Active', 
                country: 'Botswana'
            }, {
                status: 'Active', 
                country: 'Bouvet Island'
            }, {
                status: 'Active', 
                country: 'Brazil'
            }, {
                status: 'Active', 
                country: 'British Indian Ocean Territory'
            }, {
                status: 'Active', 
                country: 'Brunei Darussalam'
            }, {
                status: 'Active', 
                country: 'Bulgaria'
            }, {
                status: 'Active', 
                country: 'Burkina Faso'
            }, {
                status: 'Active', 
                country: 'Burundi'
            }, {
                status: 'Active', 
                country: 'Cabo Verde'
            }, {
                status: 'Active', 
                country: 'Cambodia'
            }, {
                status: 'Active', 
                country: 'Cameroon'
            }, {
                status: 'Active', 
                country: 'Canada'
            }, {
                status: 'Active', 
                country: 'Cayman Islands'
            }, {
                status: 'Active', 
                country: 'Central African Republic'
            }, {
                status: 'Active', 
                country: 'Chad'
            }, {
                status: 'Active', 
                country: 'Chile'
            }, {
                status: 'Active', 
                country: 'China'
            }, {
                status: 'Active', 
                country: 'Christmas Island'
            }, {
                status: 'Active', 
                country: 'Cocos (Keeling) Islands'
            }, {
                status: 'Active', 
                country: 'Colombia'
            }, {
                status: 'Active', 
                country: 'Comoros'
            }, {
                status: 'Active', 
                country: 'Congo'
            }, {
                status: 'Active', 
                country: 'Congo (Democratic Republic of the)'
            }, {
                status: 'Active', 
                country: 'Cook Islands'
            }, {
                status: 'Active', 
                country: 'Costa Rica'
            }, {
                status: 'Active', 
                country: "Côte d'Ivoire"
            }, {
                status: 'Active', 
                country: 'Croatia'
            }, {
                status: 'Active', 
                country: 'Cuba'
            }, {
                status: 'Active', 
                country: 'Curaçao'
            }, {
                status: 'Active', 
                country: 'Cyprus'
            }, {
                status: 'Active', 
                country: 'Czechia'
            }, {
                status: 'Active', 
                country: 'Denmark'
            }, {
                status: 'Active', 
                country: 'Djibouti'
            }, {
                status: 'Active', 
                country: 'Dominica'
            }, {
                status: 'Active', 
                country: 'Dominican Republic'
            }, {
                status: 'Active', 
                country: 'Ecuador'
            }, {
                status: 'Active', 
                country: 'Egypt'
            }, {
                status: 'Active', 
                country: 'El Salvador'
            }, {
                status: 'Active', 
                country: 'Equatorial Guinea'
            }, {
                status: 'Active', 
                country: 'Eritrea'
            }, {
                status: 'Active', 
                country: 'Estonia'
            }, {
                status: 'Active', 
                country: 'Ethiopia'
            }, {
                status: 'Active', 
                country: 'Falkland Islands (Malvinas)'
            }, {
                status: 'Active', 
                country: 'Faroe Islands'
            }, {
                status: 'Active', 
                country: 'Fiji'
            }, {
                status: 'Active', 
                country: 'Finland'
            }, {
                status: 'Active', 
                country: 'France'
            }, {
                status: 'Active', 
                country: 'French Guiana'
            }, {
                status: 'Active', 
                country: 'French Polynesia'
            }, {
                status: 'Active', 
                country: 'French Southern Territories'
            }, {
                status: 'Active', 
                country: 'Gabon'
            }, {
                status: 'Active', 
                country: 'Gambia'
            }, {
                status: 'Active', 
                country: 'Georgia'
            }, {
                status: 'Active', 
                country: 'Germany'
            }, {
                status: 'Active', 
                country: 'Ghana'
            }, {
                status: 'Active', 
                country: 'Gibraltar'
            }, {
                status: 'Active', 
                country: 'Greece'
            }, {
                status: 'Active', 
                country: 'Greenland'
            }, {
                status: 'Active', 
                country: 'Grenada'
            }, {
                status: 'Active', 
                country: 'Guadeloupe'
            }, {
                status: 'Active', 
                country: 'Guam'
            }, {
                status: 'Active', 
                country: 'Guatemala'
            }, {
                status: 'Active', 
                country: 'Guernsey'
            }, {
                status: 'Active', 
                country: 'Guinea'
            }, {
                status: 'Active', 
                country: 'Guinea-Bissau'
            }, {
                status: 'Active', 
                country: 'Guyana'
            }, {
                status: 'Active', 
                country: 'Haiti'
            }, {
                status: 'Active', 
                country: 'Heard Island and McDonald Islands'
            }, {
                status: 'Active', 
                country: 'Holy See (Vatican City State)'
            }, {
                status: 'Active', 
                country: 'Honduras'
            }, {
                status: 'Active', 
                country: 'Hong Kong'
            }, {
                status: 'Active', 
                country: 'Hungary'
            }, {
                status: 'Active', 
                country: 'Iceland'
            }, {
                status: 'Active', 
                country: 'India'
            }, {
                status: 'Active', 
                country: 'Indonesia'
            }, {
                status: 'Active', 
                country: 'Iran (Islamic Republic of)'
            }, {
                status: 'Active', 
                country: 'Iraq'
            }, {
                status: 'Active', 
                country: 'Ireland'
            }, {
                status: 'Active', 
                country: 'Isle of Man'
            }, {
                status: 'Active', 
                country: 'Israel'
            }, {
                status: 'Active', 
                country: 'Italy'
            }, {
                status: 'Active', 
                country: 'Jamaica'
            }, {
                status: 'Active', 
                country: 'Japan'
            }, {
                status: 'Active', 
                country: 'Jersey'
            }, {
                status: 'Active', 
                country: 'Jordan'
            }, {
                status: 'Active', 
                country: 'Kazakhstan'
            }, {
                status: 'Active', 
                country: 'Kenya'
            }, {
                status: 'Active', 
                country: 'Kiribati'
            }, {
                status: 'Active', 
                country: "Korea, Democratic People's Republic of"
            }, {
                status: 'Active', 
                country: 'Korea, Republic of'
            }, {
                status: 'Active', 
                country: 'Kuwait'
            }, {
                status: 'Active', 
                country: 'Kyrgyzstan'
            }, {
                status: 'Active', 
                country: "Lao, People's Democratic Republic"
            }, {
                status: 'Active', 
                country: 'Latvia'
            }, {
                status: 'Active', 
                country: 'Lebanon'
            }, {
                status: 'Active', 
                country: 'Lesotho'
            }, {
                status: 'Active', 
                country: 'Liberia'
            }, {
                status: 'Active', 
                country: 'Libya'
            }, {
                status: 'Active', 
                country: 'Liechtenstein'
            }, {
                status: 'Active', 
                country: 'Lithuania'
            }, {
                status: 'Active', 
                country: 'Luxembourg'
            }, {
                status: 'Active', 
                country: 'Macao'
            }, {
                status: 'Active', 
                country: 'Macedonia (the former Yugoslav Republic of)'
            }, {
                status: 'Active', 
                country: 'Madagascar'
            }, {
                status: 'Active', 
                country: 'Malawi'
            }, {
                status: 'Active', 
                country: 'Malaysia'
            }, {
                status: 'Active', 
                country: 'Maldives'
            }, {
                status: 'Active', 
                country: 'Mali'
            }, {
                status: 'Active', 
                country: 'Malta'
            }, {
                status: 'Active', 
                country: 'Marshall Islands'
            }, {
                status: 'Active', 
                country: 'Martinique'
            }, {
                status: 'Active', 
                country: 'Mauritania'
            }, {
                status: 'Active', 
                country: 'Mauritius'
            }, {
                status: 'Active', 
                country: 'Mayotte'
            }, {
                status: 'Active', 
                country: 'Mexico'
            }, {
                status: 'Active', 
                country: 'Micronesia, Federated States of'
            }, {
                status: 'Active', 
                country: 'Moldova, Republic of'
            }, {
                status: 'Active', 
                country: 'Monaco'
            }, {
                status: 'Active', 
                country: 'Mongolia'
            }, {
                status: 'Active', 
                country: 'Montenegro'
            }, {
                status: 'Active', 
                country: 'Montserrat'
            }, {
                status: 'Active', 
                country: 'Morocco'
            }, {
                status: 'Active', 
                country: 'Mozambique'
            }, {
                status: 'Active', 
                country: 'Myanmar'
            }, {
                status: 'Active', 
                country: 'Namibia'
            }, {
                status: 'Active', 
                country: 'Nauru'
            }, {
                status: 'Active', 
                country: 'Nepal'
            }, {
                status: 'Active', 
                country: 'Netherlands'
            }, {
                status: 'Active', 
                country: 'New Caledonia'
            }, {
                status: 'Active', 
                country: 'New Zealand'
            }, {
                status: 'Active', 
                country: 'Nicaragua'
            }, {
                status: 'Active', 
                country: 'Niger'
            }, {
                status: 'Active', 
                country: 'Nigeria'
            }, {
                status: 'Active', 
                country: 'Niue'
            }, {
                status: 'Active', 
                country: 'Norfolk Island'
            }, {
                status: 'Active', 
                country: 'Northern Mariana Islands'
            }, {
                status: 'Active', 
                country: 'Norway'
            }, {
                status: 'Active', 
                country: 'Oman'
            }, {
                status: 'Active', 
                country: 'Pakistan'
            }, {
                status: 'Active', 
                country: 'Palau'
            }, {
                status: 'Active', 
                country: 'Palestine, State of'
            }, {
                status: 'Active', 
                country: 'Panama'
            }, {
                status: 'Active', 
                country: 'Papua New Guinea'
            }, {
                status: 'Active', 
                country: 'Paraguay'
            }, {
                status: 'Active', 
                country: 'Peru'
            }, {
                status: 'Active', 
                country: 'Philippines'
            }, {
                status: 'Active', 
                country: 'Pitcairn'
            }, {
                status: 'Active', 
                country: 'Poland'
            }, {
                status: 'Active', 
                country: 'Portugal'
            }, {
                status: 'Active', 
                country: 'Puerto Rico'
            }, {
                status: 'Active', 
                country: 'Qatar'
            }, {
                status: 'Active', 
                country: 'Réunion'
            }, {
                status: 'Active', 
                country: 'Romania'
            }, {
                status: 'Active', 
                country: 'Russian Federation'
            }, {
                status: 'Active', 
                country: 'Rwanda'
            }, {
                status: 'Active', 
                country: 'Saint Barthélemy'
            }, {
                status: 'Active', 
                country: 'Saint Helena, Ascension and Tristan da Cunha'
            }, {
                status: 'Active', 
                country: 'Saint Kitts and Nevis'
            }, {
                status: 'Active', 
                country: 'Saint Lucia'
            }, {
                status: 'Active', 
                country: 'Saint Martin (French part)'
            }, {
                status: 'Active', 
                country: 'Saint Pierre and Miquelon'
            }, {
                status: 'Active', 
                country: 'Saint Vincent and the Grenadines'
            }, {
                status: 'Active', 
                country: 'Samoa'
            }, {
                status: 'Active', 
                country: 'San Marino'
            }, {
                status: 'Active', 
                country: 'Sao Tome and Principe'
            }, {
                status: 'Active', 
                country: 'Saudi Arabia'
            }, {
                status: 'Active', 
                country: 'Senegal'
            }, {
                status: 'Active', 
                country: 'Serbia'
            }, {
                status: 'Active', 
                country: 'Seychelles'
            }, {
                status: 'Active', 
                country: 'Sierra Leone'
            }, {
                status: 'Active', 
                country: 'Singapore'
            }, {
                status: 'Active', 
                country: 'Sint Maarten (Dutch part)'
            }, {
                status: 'Active', 
                country: 'Slovakia'
            }, {
                status: 'Active', 
                country: 'Slovenia'
            }, {
                status: 'Active', 
                country: 'Solomon Islands'
            }, {
                status: 'Active', 
                country: 'Somalia'
            }, {
                status: 'Active', 
                country: 'South Africa'
            }, {
                status: 'Active', 
                country: 'South Georgia and the South Sandwich Islands'
            }, {
                status: 'Active', 
                country: 'South Sudan'
            }, {
                status: 'Active', 
                country: 'Spain'
            }, {
                status: 'Active', 
                country: 'Sri Lanka'
            }, {
                status: 'Active', 
                country: 'Sudan'
            }, {
                status: 'Active', 
                country: 'Suriname'
            }, {
                status: 'Active', 
                country: 'Svalbard and Jan Mayen'
            }, {
                status: 'Active', 
                country: 'Swaziland'
            }, {
                status: 'Active', 
                country: 'Sweden'
            }, {
                status: 'Active', 
                country: 'Switzerland'
            }, {
                status: 'Active', 
                country: 'Syrian Arab Republic'
            }, {
                status: 'Active', 
                country: 'Taiwan, Province of China'
            }, {
                status: 'Active', 
                country: 'Tajikistan'
            }, {
                status: 'Active', 
                country: 'Tanzania, United Republic of'
            }, {
                status: 'Active', 
                country: 'Thailand'
            }, {
                status: 'Active', 
                country: 'Timor-Leste'
            }, {
                status: 'Active', 
                country: 'Togo'
            }, {
                status: 'Active', 
                country: 'Tokelau'
            }, {
                status: 'Active', 
                country: 'Tonga'
            }, {
                status: 'Active', 
                country: 'Trinidad and Tobago'
            }, {
                status: 'Active', 
                country: 'Tunisia'
            }, {
                status: 'Active', 
                country: 'Turkey'
            }, {
                status: 'Active', 
                country: 'Turkmenistan'
            }, {
                status: 'Active', 
                country: 'Turks and Caicos Islands'
            }, {
                status: 'Active', 
                country: 'Tuvalu'
            }, {
                status: 'Active', 
                country: 'Uganda'
            }, {
                status: 'Active', 
                country: 'Ukraine'
            }, {
                status: 'Active', 
                country: 'United Arab Emirates'
            }, {
                status: 'Active', 
                country: 'United Kingdom of Great Britain and Northern Ireland'
            }, {
                status: 'Active', 
                country: 'United States of America'
            }, {
                status: 'Active', 
                country: 'United States Minor Outlying Islands'
            }, {
                status: 'Active', 
                country: 'Uruguay'
            }, {
                status: 'Active', 
                country: 'Uzbekistan'
            }, {
                status: 'Active', 
                country: 'Vanuatu'
            }, {
                status: 'Active', 
                country: 'Venezuela (Bolivarian Republic of)'
            }, {
                status: 'Active', 
                country: 'Viet Nam'
            }, {
                status: 'Active', 
                country: 'Virgin Islands (British)'
            }, {
                status: 'Active', 
                country: 'Virgin Islands (U.S.)'
            }, {
                status: 'Active', 
                country: 'Wallis and Futuna'
            }, {
                status: 'Active', 
                country: 'Western Sahara'
            }, {
                status: 'Active', 
                country: 'Yemen'
            }, {
                status: 'Active', 
                country: 'Zambia'
            }, {
                status: 'Active', 
                country: 'Zimbabwe'
            }
        ])
        .then(() => res.send('Success! Publication Countries are populated'))
        .catch(err => res.send(err));
}