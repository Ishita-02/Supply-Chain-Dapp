## About
The Sustainable Supply Chain DApp is developed to measure the environmental and social performance of the supply chain. The information system is designed to collect data from supply chain actors, assess their environmental and social sustainability and transfer them to the relevant stakeholders for decision-making processes. At the same time, the blockchain system can be used to prove the origin of the products, track and trace the product journey throughout the supply chain and measure the product lifecycle inventory.

A DSS is composed of three components; a model base, a database, and a user interface. The model base component is a sustainability assessment model that calculates the environmental and social sustainability performance of the supply chain. It also does the life cycle inventory analysis of the product produced. The database is a blockchain database that stores the system inputs. The model runs on the user interface (UI) built on the React framework using JavaScript language. The UI allows users to run the sustainability model and presents the results in tables and charts. 

<img src="https://user-images.githubusercontent.com/44509698/234410122-899bdfe8-495d-40ae-8493-0b33bd5db430.jpg" width="500">

The user enters input data into the system. These can be the data for environmental and social sustainability, or life cycle inventory. When the data is entered, the user runs the sustainability model. Once the model is run, the data entered is uploaded to the blockchain database. The sustainability model retrieves the data from the blockchain database to calculate sustainability assessments and reports. After this step, the user can view the sustainability assessments in tables and charts. 

## System Architecture
<img src="https://user-images.githubusercontent.com/44509698/234395807-fe548331-02ab-4644-8938-9fe63077f22a.png" width="600">

Library | Version | Use
------------ | ------------- | -------------
Truffle | 5.3.5 | Compile/deploy/test contracts, Ganache for running local test node
Solidity | 0.5.16 | Compile contracts
Node | 16.17.0 | Build React UI
Web3 | 1.3.5 | Connect UI to EVM
React | 18.2.0 | User interface

## System Workflow
This diagram shows the different actors and their interactions with the system.

<img src="https://user-images.githubusercontent.com/44509698/234407614-6d68b711-a044-4140-a40f-97bdb38d82ab.jpg" width="900">

In the assessments page, the focal company and its suppliers do the environmental, social assessments to measure their monthly or annual sustainability performance. 

![Screenshot 2024-04-26 195526](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/1bd81a97-ca9d-4318-9bc6-7d8ba62aff42)

The focal company enters information into the environmental assessment form. After submitting the assessment form, the system automatically calculates sustainability indicators.

![Screenshot 2024-05-08 192121](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/89924a0b-f42c-46a2-9043-060ea70b05ff)

The focal company or suppliers can display the environmental and social sustainability indicators with charts. In the charts, indicators are grouped according to similarities of their measurement units or their contexts. Also, in the chart section various sustainability assessments can be viewed at the same time or can be filtered by month or year. Thus, stakeholders can analyze and compare their past performances and evaluate their sustainability progress. 



When the focal company and all of its suppliers have completed their environmental and social assessments, the company creates orders. To create an order, the focal company first must create a digital record of the product. The image of the product is uploaded to IPFS.

![Screenshot 2024-04-26 195621](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/f17295da-7849-497f-ab8a-ede901de125d)

After registering the product, the focal company creates an order. In this scenario, production of 1000 t-shirts are ordered. The permission to add products and orders is only given to the focal company.

![Screenshot 2024-04-26 195435](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/f009b3ef-f054-4059-9928-fafbc11bf921)

Later, the suppliers’ send or receive the shipments of the order. When sending or receiving the shipments, each supplier selects the order and their production stage. As shipment is sent or received the real-time location (latitude and longitude), descriptive name of the location and the time information is obtained and displayed via Google API.

![Screenshot 2024-05-08 192245](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/3380b792-521e-4641-bcdc-949ce41bb101)


The life cycle inventory for each product can be done after relevant production stages are completed. The company or the suppliers enter information to LCI form of the material flow for their production stage (Figure 27). After submitting the form, the system automatically calculates LCI indicators.

![Screenshot 2024-05-08 192411](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/b91c9ff5-49d7-4d39-963f-5fa82c8be605)


Finally, when the order is completed, customers can see the entire product journey; the shipment locations and time, production stages. They can also display the environmental footprint of each product and the environmental and social sustainability assessment of suppliers and the focal company. 

![Screenshot 2024-04-10 010454](https://github.com/Ishita-02/Supply-Chain-Dapp/assets/88130678/ea887ff8-3e66-461a-913c-16f47fece24c)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
