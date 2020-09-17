## About
This is a small argparse + firebase-admin based cli utility to import contents of a `data.json` into a collection of firestore.

All you need is the credentials for Firebase Admin SDK from your project settings.

## CLI Syntax

```
Data Uploader for Firestore (using Firebase Admin SDK)

optional arguments:
  -h, --help                show this help message and exit
  -v, --version             show program's version number and exit
  --key KEY                 File containing the service account key (default: serviceAccountKey.json)
  --collection COLLECTION   Name of the collection (default: data)
  --data DATA               Path to the data.json file (default: data.json)
```

## Important
*Feel free to fork and use, but do not blame me if anything goes wrong, if in doubt test it with an empty collection.*

*__If you import data into a collection an existing document with the same identifier will be overwritten.__*
