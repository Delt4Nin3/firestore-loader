#!/usr/bin/env node
'use strict';

const { ArgumentParser, RawDescriptionHelpFormatter } = require('argparse');
const { version } = require('./package.json');
const admin = require('firebase-admin');
const path = require('path');

const parser = new ArgumentParser({
  description: 'Data Uploader for Firestore (using Firebase Admin SDK)',
  add_help: true,
});

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('--key', { help: 'File containing the service account key (default: serviceAccountKey.json)', required: false, default: 'serviceAccountKey.json', type: String });
parser.add_argument('--collection', { help: 'Name of the collection (default: data)', required: false,  default: 'data', type: String });
parser.add_argument('--data', { help: 'Path to the data.json file (default: data.json)', required: false, default: 'data.json', type: String });

const { key, collection, data } = parser.parse_args();

admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve('.', key)))
});

const _data = require(path.resolve('.', data));
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

if (_data && (typeof _data === "object")) {
  Object.keys(_data).forEach(docKey => {
    firestore.collection(collection).doc(docKey).set(_data[docKey]).then((res) => {
      console.log("Document " + docKey + " successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  });
}
