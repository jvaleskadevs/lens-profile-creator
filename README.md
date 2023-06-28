# lens-profile-creator
A helpful tool to create a Lens Profile on the Polygon Mumbai Network.

## IMPORTANT - only works on testnet, it creates `<your_handle>.test` profiles. 
Example: 
`jvaleska.test`

## Run the app

- Clone the repo:
```
git clone https://github.com/jvaleskadevs/lens-profile-creator.git
```
- Install dependencies:
```
npm install
```
- Run the app:
```
npm run dev
```

## Use the app
- Login with your wallet pointing to the Mumbai network.
- Type your new Lens handle.
- Click on Create.
- Done!

## Build your own Lens Profile Creator app (tutorial)

- Create a next app (select default options):
```
npx create-next-app lens-profile-creator
```
- Move into your app directory and install Lens dependencies:
```
cd lens-profile-creator

npm install @lens-protocol/react-web ethers@legacy-v5 wagmi@"^1.1.0" @lens-protocol/wagmi
```
- Paste the `app/layout.tsx` and `app/page.tsx` from this repo.
- Run the app:
`npm run dev`
