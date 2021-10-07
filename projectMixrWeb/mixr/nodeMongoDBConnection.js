//importing MongoClient from node modules
//package that houses everything we need to successfully interact with our DB using a connection URI
const {MongoClient} = require('mongodb')

//Function to connect to and disconnect from the Mongo Database and call query functions
//At the moment this is a skeleton of a fully functional backend....
async function main() {
    //variable to store the URI from our database
    //This can be found on MongoDB by clicking on the connect button on the cluster icon
    //In this icon whitelist your IP address, then select connect by NodeJS
    //You don't actually need to do this unless you specifically want to
    const uri = ""
    // URI removed because it is inactive as the cluster has been taken down
    
    //variable to store a promise to instantiate the MongoDB cluster
    //The promise is essentially a variable that says it's in the process of pulling some data, but is not complete
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log(client)
    //This is a try-catch block
    //It is a Javascript block which essentially waits and looks for error to be thrown from a generator function
    //A generator function is a function that continually executes until some promise is fulfilled
    //Generally used to running database queries
    //Try is a statement that essentially tells the function to listen for errors to fire and throw those errors
    //Catch is a statement that tells try where to throw the error and how to handle it
    //The errors referred to would come from the database....
    try {
        //This line of code essentially tells the function to halt execution until the promise is fulfilled (the cluster has been connected to)
        await client.connect()
        console.log('connected')
        //This line of code also tells the function to halt execution until there is a connection
        //Once a connection is established, a function is called to list the databases on the MongoDB cluster
        // await addSingleClient(client)
        await pullClient(client)
        // await listDatabases(client)
    }
    //Catch is essentially saying if an error is thrown 'catch' it and store it in errors then print it to the console
    catch (err) {
        console.error(err)
    }
    //Once the promise is fulfilled or an error is thrown, close the connection to the database
    finally {
        await client.close()
    }
}

main().catch(console.errors)

async function pullClient(cluster){
    const clusterName = 'MixrDB'
    const collectionName = 'Users'
    //.findOne() property of collection that finds a single JSON document by some given parameters
    //.findMany() property of collection that finds multiple JSON documents by some similar given parameters
    const pulledClient = await cluster.db(clusterName).collection(collectionName).findOne(
        {userName: 'DClient'}
    )

    //Need to convert results into an array and wait for returned array promise to resolve
    console.log(pulledClient)
}

async function addSingleClient(cluster, client){
    const clusterName = 'MixrDB'
    const collectionName = 'Users'
    //.db() property of mongo client used to access a database by a string for the db name
    //.collection() property of database used to access a collection by a string for collection name
    //.insertOne() property of collection to insert one object into the collection
    //.insertMany() property of collection to insert an array of objects into a collection
    await cluster.db(clusterName).collection(collectionName).insertOne(client)
}

//Function to list the databases in the Mongo cluster
async function listDatabases(cluster) {
    const dataBasesList = await cluster.db().admin().listDatabases()

    console.log("Databases:")
    dataBasesList.databases.forEach(db => console.log(` - ${db.name}`))
}