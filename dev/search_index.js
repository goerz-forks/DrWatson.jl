var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "#DrWatson-1",
    "page": "Introduction",
    "title": "DrWatson",
    "category": "section",
    "text": "The perfect sidekick to your scientific inquiriesDrWatson is a Julia package created to help people \"deal\" with their simulations, simulation parameters, where are files saved, experimental data, scripts, existing simulations, project source code and in general their scientific projects.DrWatson is currently in beta and under development!"
},

{
    "location": "#Rationale-1",
    "page": "Introduction",
    "title": "Rationale",
    "category": "section",
    "text": "Have you thought things like:Urgh, I moved my folders and now my load commands don\'t work anymore!\nMaaaan, have I run this simulation already?\nDo I have to produce a dataframe of my finished simulations AGAIN?!\nWait, are those experiments already processed?\nPFfffff I am tired of typing savename = \"w=$w_f=$f_x=$x.jld2, can\'t I do it automatically?\nI wish I could just use Parameters.jl and just translate my simulations into a dataframe.\nYeah you\'ve sent me your project but none of the scripts work...DrWatson tries to eradicate such bad thoughts and bedtime nightmares."
},

{
    "location": "#Description-of-DrWatson-1",
    "page": "Introduction",
    "title": "Description of DrWatson",
    "category": "section",
    "text": "DrWatson follows these simple principles:Basic. The functionality offered is something simple, a baseline from where you handle your project as you wish.\nConsistent. The functionality is identical across all projects and DrWatson offers (and parts of it assume) a universal base project structure.\nAllows increments. You didn\'t plan your project well enough? Want to add more folders, more files, more variables to your simulations? It\'s fine.\nHelpful. DrWatson has been beta tested in real-world scientific projects and has matured based on feedback from scientists.\nReproducible. DrWatson aims to make your projects fully reproducible using Julia\'s package manager and consistent naming schemes."
},

{
    "location": "#Functionality-1",
    "page": "Introduction",
    "title": "Functionality",
    "category": "section",
    "text": "The functionality of DrWatson is composed of two main parts that are independent of each other (and you don\'t have to use both of them).Project Setup : A universal project structure and functions that allow you to consistently and robustly navigate through your project, no matter where it is located on your hard drive.\nHandling Simulations : A robust scheme for saving your data, naming files, finding out if a simulation already exists, producing tables of existing simulations/data."
},

{
    "location": "#Inspirations-1",
    "page": "Introduction",
    "title": "Inspirations",
    "category": "section",
    "text": "https://drivendata.github.io/cookiecutter-data-science/#cookiecutter-data-sciencehttps://discourse.julialang.org/t/computational-experiments-organising-different-algorithms-their-parameters-and-results/10774/7http://neuralensemble.org/sumatra/https://github.com/mohamed82008/ComputExp.jlhttps://sacred.readthedocs.io/en/latest/index.htmlhttps://experimentator.readthedocs.io/en/latest/"
},

{
    "location": "project/#",
    "page": "Project Setup",
    "title": "Project Setup",
    "category": "page",
    "text": ""
},

{
    "location": "project/#Project-Setup-1",
    "page": "Project Setup",
    "title": "Project Setup",
    "category": "section",
    "text": "Part of the functionality of DrWatson is creating and navigating through a project setup consistently. This works even if you move your project to a different location/computer and in addition the navigation process is identical across any project that uses DrWatson.For this to work, you only need to follow these rules:Your science project is also a Julia project defined by a Project.toml file.\nYou first activate this project environment before running any code. This can be done in multiple ways:\nby doing Pkg.activate(\"path/to/project\") programmatically\nby using the startup flag --project path when starting Julia\nby setting the JULIA_PROJECT environment variable\nYou use the functions scriptdir, datadir, etc. from DrWatson (see Navigating the Project)"
},

{
    "location": "project/#Default-Project-Setup-1",
    "page": "Project Setup",
    "title": "Default Project Setup",
    "category": "section",
    "text": "Here is the default project setup that DrWatson suggests (and assumes, for the functionality of this page):using DrWatson\nstruct ShowFile\n    file::String\nend\nfunction Base.show(io::IO, ::MIME\"text/plain\", f::ShowFile)\n    write(io, read(f.file))\nendShowFile(dirname(pathof(DrWatson))*\"/defaults/project_structure.txt\") # hide"
},

{
    "location": "project/#src-vs-scripts-1",
    "page": "Project Setup",
    "title": "src vs scripts",
    "category": "section",
    "text": "Seems like src and scripts folders have pretty similar functionality. However there is a distinction between these two. You can follow these mental rules to know where to put file.jl:If upon include(\"file.jl\") there is anything being produced, be it data files, plots or even output to the console, then it should be in scripts.\nIf it is functionality used across multiple files or pipelines, it should be in src.\nsrc should only contain files the define functions or modules but not output anything."
},

{
    "location": "project/#DrWatson.initialize_project",
    "page": "Project Setup",
    "title": "DrWatson.initialize_project",
    "category": "function",
    "text": "initialize_project(path [, name]; kwargs...)\n\nInitialize a scientific project expected by DrWatson inside the given path. If its name is not given, it is assumed to be the folder\'s name.\n\nThe new project remains activated for you to immidiately add packages.\n\nKeywords\n\nreadme = true : adds a README.md file.\nauthors = nothing : if a string or container of strings, adds the authors in the Project.toml file.\nforce = false : If the path is not empty then throw an error. If however force is true then recursively delete everything in the path and create the project.\n\n\n\n\n\n"
},

{
    "location": "project/#Initializing-a-Project-1",
    "page": "Project Setup",
    "title": "Initializing a Project",
    "category": "section",
    "text": "To initialize a project as described in the Default Project Setup section, we provide the following function:initialize_project"
},

{
    "location": "project/#DrWatson.projectdir",
    "page": "Project Setup",
    "title": "DrWatson.projectdir",
    "category": "function",
    "text": "projectdir()\n\nReturn the directory of the currently active project. Ends with \"/\".\n\n\n\n\n\n"
},

{
    "location": "project/#DrWatson.projectname",
    "page": "Project Setup",
    "title": "DrWatson.projectname",
    "category": "function",
    "text": "projectname()\n\nReturn the name of the currently active project.\n\n\n\n\n\n"
},

{
    "location": "project/#Navigating-the-Project-1",
    "page": "Project Setup",
    "title": "Navigating the Project",
    "category": "section",
    "text": "To be able to navigate the project consistently, DrWatson provides the following functions:datadir() = projectdir()*\"data/\"\nsrcdir() = projectdir()*\"src/\"\nplotsdir() = projectdir()*\"plots/\"\nscriptdir() = projectdir()*\"scripts/\"while as you can see all of them use projectdir:projectdir\nprojectnameIn addition, all these functions end with / by default. This means that you can directly chain them with a file name. E.g. you could dousing DrWatson, FileIO\nfile = makesimulation()\nFileIO.save(datadir()*\"simulations/test.jld2\", file)"
},

{
    "location": "project/#Reproducibility-1",
    "page": "Project Setup",
    "title": "Reproducibility",
    "category": "section",
    "text": "This project setup approach that DrWatson suggests has a very big side-benefit: it is fully reproducible firstly because it uses Julia\'s suggested project structure and secondly because the navigation only uses local directories.If you send your entire project folder to a colleague, they only need to do:julia> cd(\"path/to/project\")\npkg> activate .\npkg> instantiateAll required packages and dependencies will be installed and then any script that was running in your computer will also be running in their computer in the same way!"
},

{
    "location": "savenames/#",
    "page": "Handling Simulations",
    "title": "Handling Simulations",
    "category": "page",
    "text": ""
},

{
    "location": "savenames/#Handling-Simulations-1",
    "page": "Handling Simulations",
    "title": "Handling Simulations",
    "category": "section",
    "text": ""
},

{
    "location": "savenames/#DrWatson.savename",
    "page": "Handling Simulations",
    "title": "DrWatson.savename",
    "category": "function",
    "text": "savename(d, allowedtypes = (Real, String, Symbol);\n         accesses = allaccess(d), digits = 3)\n\nCreate a shorthand name, commonly used for saving a file, based on the parameters in the container d (Dict, NamedTuple or any other Julia composite type, e.g. created with Parameters.jl).\n\nThe function chains keys and values into a string of the form:\n\nkey1=val1_key2=val2_key3=val3....\n\nwhile the keys are always sorted alphabetically.\n\nsavename can be very conveniently combined with @dict.\n\nDetails\n\nOnly values of type in allowedtypes are used in the name. You can also specify which keys you want to use with the keyword accesses. By default this is all possible keys d can be accessed with, see allaccess.\n\nFloating point values are rounded to digits. In addition if the following holds:\n\nround(val; digits = digits) == round(Int, val)\n\nthen the integer value is used in the name instead.\n\nExamples\n\njulia> d = (a = 0.153456453, b = 5.0, mode = \"double\")\n(a = 0.153456453, b = 5.0, mode = \"double\")\n\njulia> savename(d; digits = 4)\n\"a=0.1535_b=5_mode=double\"\n\njulia> savename(d, (String,))\n\"mode=double\"\n\njulia> rick = (never = \"gonna\", give = \"you\", up = \"!\");\n\njulia> savename(rick) # keys are always sorted\n  \"give=you_never=gonna_up=!\"\n\n\n\n\n\n"
},

{
    "location": "savenames/#DrWatson.@dict",
    "page": "Handling Simulations",
    "title": "DrWatson.@dict",
    "category": "macro",
    "text": "@dict vars...\n\nCreate a dictionary out of the given variables that has as keys the variable names (as strings) and as values their values.\n\nExamples\n\njulia> ω = 5; χ = \"test\"; ζ = π/3;\n\njulia> @dict ω χ ζ\nDict{String,Any} with 3 entries:\n  \"ω\" => 5\n  \"χ\" => \"test\"\n  \"ζ\" => 1.0472\n\n\n\n\n\n"
},

{
    "location": "savenames/#DrWatson.allaccess",
    "page": "Handling Simulations",
    "title": "DrWatson.allaccess",
    "category": "function",
    "text": "allaccess(d)\n\nReturn all the keys d can be accessed using access.\n\n\n\n\n\n"
},

{
    "location": "savenames/#DrWatson.access",
    "page": "Handling Simulations",
    "title": "DrWatson.access",
    "category": "function",
    "text": "access(d, key)\n\nAccess d with given key. For AbstractDict this is getindex, for anything else it is getproperty.\n\n\n\n\n\n"
},

{
    "location": "savenames/#Naming-Schemes-1",
    "page": "Handling Simulations",
    "title": "Naming Schemes",
    "category": "section",
    "text": "A robust naming scheme allows you to create quick names for simulations, create lists of simulations, check existing simulations, etc. savename\n@dict\nDrWatson.allaccess\nDrWatson.accessNotice that the naming scheme integrates perfectly with Parameters.jl."
},

{
    "location": "savenames/#Adding-Runs-1",
    "page": "Handling Simulations",
    "title": "Adding Runs",
    "category": "section",
    "text": "WIP. (Adding simulation runs to a table/csv/dataframe)"
},

]}
