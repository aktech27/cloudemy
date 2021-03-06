const CODES = {
  Abkhazia: "+7-840",
  Afghanistan: "+93",
  Albania: "+355",
  Algeria: "+213",
  American_Samoa: "+1-684",
  Andorra: "+376",
  Angola: "+244",
  Anguilla: "+1-264",
  Antigua_and_Barbuda: "+1-268",
  Argentina: "+54",
  Armenia: "+374",
  Aruba: "+297",
  Ascension: "+247",
  Australia: "+61",
  Australian_External_Territories: "+672",
  Austria: "+43",
  Azerbaijan: "+994",
  Bahamas: "+1-242",
  Bahrain: "+973",
  Bangladesh: "+880",
  Barbados: "+1-246",
  Barbuda: "+1-268",
  Belarus: "+375",
  Belgium: "+32",
  Belize: "+501",
  Benin: "+229",
  Bermuda: "+1-441",
  Bhutan: "+975",
  Bolivia: "+591",
  Bosnia_and_Herzegovina: "+387",
  Botswana: "+267",
  Brazil: "+55",
  British_Indian_Ocean_Territory: "+246",
  British_Virgin_Islands: "+1-284",
  Brunei: "+673",
  Bulgaria: "+359",
  Burkina_Faso: "+226",
  Burundi: "+257",
  Cambodia: "+855",
  Cameroon: "+237",
  Canada: "+1",
  Cape_Verde: "+238",
  Cayman_Islands: "+-345",
  Central_African_Republic: "+236",
  Chad: "+235",
  Chile: "+56",
  China: "+86",
  Christmas_Island: "+61",
  CocosKeeling_Islands: "+61",
  Colombia: "+57",
  Comoros: "+269",
  Congo: "+242",
  Congo__Dem_Rep_of_Zaire: "+243",
  Cook_Islands: "+682",
  Costa_Rica: "+506",
  Croatia: "+385",
  Cuba: "+53",
  Curacao: "+599",
  Cyprus: "+537",
  Czech_Republic: "+420",
  Denmark: "+45",
  Diego_Garcia: "+246",
  Djibouti: "+253",
  Dominica: "+1-767",
  Dominican_Republic: "+1-809",
  East_Timor: "+670",
  Easter_Island: "+56",
  Ecuador: "+593",
  Egypt: "+20",
  El_Salvador: "+503",
  Equatorial_Guinea: "+240",
  Eritrea: "+291",
  Estonia: "+372",
  Ethiopia: "+251",
  Falkland_Islands: "+500",
  Faroe_Islands: "+298",
  Fiji: "+679",
  Finland: "+358",
  France: "+33",
  French_Antilles: "+596",
  French_Guiana: "+594",
  French_Polynesia: "+689",
  Gabon: "+241",
  Gambia: "+220",
  Georgia: "+995",
  Germany: "+49",
  Ghana: "+233",
  Gibraltar: "+350",
  Greece: "+30",
  Greenland: "+299",
  Grenada: "+1-473",
  Guadeloupe: "+590",
  Guam: "+1-671",
  Guatemala: "+502",
  Guinea: "+224",
  GuineaBissau: "+245",
  Guyana: "+595",
  Haiti: "+509",
  Honduras: "+504",
  Hong_Kong_SAR_China: "+852",
  Hungary: "+36",
  Iceland: "+354",
  India: "+91",
  Indonesia: "+62",
  Iran: "+98",
  Iraq: "+964",
  Ireland: "+353",
  Israel: "+972",
  Italy: "+39",
  Ivory_Coast: "+225",
  Jamaica: "+1-876",
  Japan: "+81",
  Jordan: "+962",
  Kazakhstan: "+7-7",
  Kenya: "+254",
  Kiribati: "+686",
  Kuwait: "+965",
  Kyrgyzstan: "+996",
  Laos: "+856",
  Latvia: "+371",
  Lebanon: "+961",
  Lesotho: "+266",
  Liberia: "+231",
  Libya: "+218",
  Liechtenstein: "+423",
  Lithuania: "+370",
  Luxembourg: "+352",
  Macau_SAR_China: "+853",
  Macedonia: "+389",
  Madagascar: "+261",
  Malawi: "+265",
  Malaysia: "+60",
  Maldives: "+960",
  Mali: "+223",
  Malta: "+356",
  Marshall_Islands: "+692",
  Martinique: "+596",
  Mauritania: "+222",
  Mauritius: "+230",
  Mayotte: "+262",
  Mexico: "+52",
  Micronesia: "+691",
  Midway_Island: "+1-808",
  Moldova: "+373",
  Monaco: "+377",
  Mongolia: "+976",
  Montenegro: "+382",
  Montserrat: "+1664",
  Morocco: "+212",
  Myanmar: "+95",
  Namibia: "+264",
  Nauru: "+674",
  Nepal: "+977",
  Netherlands: "+31",
  Netherlands_Antilles: "+599",
  Nevis: "+1-869",
  New_Caledonia: "+687",
  New_Zealand: "+64",
  Nicaragua: "+505",
  Niger: "+227",
  Nigeria: "+234",
  Niue: "+683",
  Norfolk_Island: "+672",
  North_Korea: "+850",
  Northern_Mariana_Islands: "+1-670",
  Norway: "+47",
  Oman: "+968",
  Pakistan: "+92",
  Palau: "+680",
  Palestinian_Territory: "+970",
  Panama: "+507",
  Papua_New_Guinea: "+675",
  Paraguay: "+595",
  Peru: "+51",
  Philippines: "+63",
  Poland: "+48",
  Portugal: "+351",
  Puerto_Rico: "+1-787",
  Qatar: "+974",
  Reunion: "+262",
  Romania: "+40",
  Russia: "+7",
  Rwanda: "+250",
  Samoa: "+685",
  San_Marino: "+378",
  Saudi_Arabia: "+966",
  Senegal: "+221",
  Serbia: "+381",
  Seychelles: "+248",
  Sierra_Leone: "+232",
  Singapore: "+65",
  Slovakia: "+421",
  Slovenia: "+386",
  Solomon_Islands: "+677",
  South_Africa: "+27",
  South_Georgia_and_the_South_Sandwich_Islands: "+500",
  South_Korea: "+82",
  Spain: "+34",
  Sri_Lanka: "+94",
  Sudan: "+249",
  Suriname: "+597",
  Swaziland: "+268",
  Sweden: "+46",
  Switzerland: "+41",
  Syria: "+963",
  Taiwan: "+886",
  Tajikistan: "+992",
  Tanzania: "+255",
  Thailand: "+66",
  Timor_Leste: "+670",
  Togo: "+228",
  Tokelau: "+690",
  Tonga: "+676",
  Trinidad_and_Tobago: "+1-868",
  Tunisia: "+216",
  Turkey: "+90",
  Turkmenistan: "+993",
  Turks_and_Caicos_Islands: "+1-649",
  Tuvalu: "+688",
  US_Virgin_Islands: "+1-340",
  Uganda: "+256",
  Ukraine: "+380",
  United_Arab_Emirates: "+971",
  United_Kingdom: "+44",
  United_States: "+1",
  Uruguay: "+598",
  Uzbekistan: "+998",
  Vanuatu: "+678",
  Venezuela: "+58",
  Vietnam: "+84",
  Wake_Island: "+1-808",
  Wallis_and_Futuna: "+681",
  Yemen: "+967",
  Zambia: "+260",
  Zanzibar: "+255",
  Zimbabwe: "+263",
};
export default CODES;
