# PillPal - Medication Adherence, Managed

## The Problem
The elderly represent one of the most medically vulnerable demographics as a result of their increased chances of multiple comorbidities. Elderly patients therefore have a propensity for polypharmacy, with 20% of people over the age of 65 taking upwards of ten medications each day. Medication adherence among the elderly is thus an incredibly important issue. However, it continues to be a problem for a whole host of reasons. Perhaps the most worrisome of these reasons is deteriorating memory. In far too many cases, elders forget to take necessary medications or, tragically, forget that they already took the medication and overdose. 

## The Solution
PillPal is a comprehensive suite of tools that develop a shared network of responsibility to remind patients of the times they should be taking their medications as well as their prescribed dosages. On the patient-side, the system uses Alexa to give a vocal reminder of which medications should be taken at which time. Because mobile interfaces can be difficult to use for this demographic, we wanted our project to provide a sense of interpersonal communication, improving accessibility. A series of voice-enabled commands allow patients to learn more about the drugs they're taking, why they're taking them, and how often they should be taken.

Furthermore, the product integrates caretaker interactions by sending push notifications to help them monitor medication adherence and work concurrently with clinicians. From a physician's point of view, PillPal's records can be accessed and updated so they remain reliable and up-to-date. This mitigates miscommunication and encourages the sharing of vital data.

## How we built it
Our team used a number of AWS services - namely, Alexa connected with Lambda functions, as well as a DynamoDB database, CloudWatch events, and SNS push notifications. We also made an interactive proof-of-concept for the web/mobile app design using Figma and Invision.

Doctors and caregivers are able to access and modify database records for their patient through the web app. Alexa interfaces with this, updating once a minute, to tell patients in real time when they should next be taking their medication based on DynamoDB records.

## What's next for PillPal
- Pill dispensers that dispense the exact amount of medication at given times exist, but are very expensive, fetching upwards of $1000. In the future, we hope to interface PillPal with a physical dispenser to drive down costs and improve accessibility for such a product.
- We also hope to develop a native mobile app interface for physicians/medical personnel and caregivers to communicate with PillPal seamlessly.
- To ensure HIPPA compiance, we wish to secure the system of communication with state-of-the-art cybersecurity methodologies.

## Challenges we ran into
One major decision we had to make early on was choosing between a Node.js and a Python-based development environment. Our team members were more experienced with Python, but ultimately we decided to work within a Node.js environment to maximize web compatibility, deal with dependencies, and follow the most up-to-date conventions for web development.

Another major decision we had to make was determining the database format for our data. We had to choose between a relational SQL database (with Amazon Aurora) and a non-relational NoSQL database (with DynamoDB). In the end, we went with a NoSQL database because of its ability to be exported as a JSON file, allowing for the future development of PillPal as a REST-ful API.

Later on, we ran into problems with asynchronous processes on Alexa. These processes initially ran too slow and caused missing statements within our code. Ultimately, we solved this problem by forcing the asynchronous processes to load before continuing with the skill logic. We found that the delay caused by this was imperceptible, and continued with our development.

## Accomplishments that we're proud of
One thing we're proud of is the fact that we created a full system for the issue of medication adherence. Coming in, each of us only expected to make a standalone app at most. This shift in focus during the hackathon is important because major changes aren't caused by apps, they're caused by new systems of approach. We hope to expand PillPal into more and more areas of interest, strengthening its ability to help the people who need it most.

## What we learned
More than anything, we learned how to wire together a whole suite of AWS products. This, in turn, allowed us to diversify our initial product. We specifically thank Tyler Lynch and Paul Curcio for guiding us on this path.

## Other benefits of PillPal
Outside of medication adherence, this app can improve communication between elderly patients and their physicians. It is not uncommon for elderly patients to leave meetings with their doctors without complete awareness of what they have been told to do. This may include exercise regiments or diet restrictons.

##Sources
http://www.sciencedirect.com/science/article/pii/S2210833515000441
http://www.pharmacytimes.com/publications/issue/2011/january2011/rxfocus-0111
