This is chatbot for HACKATHON competitions

Bot should have a name ? jeni

Flow that should start working with bot:
- Open the app, start "bot feature"
- Sign in with Facebook to connect Jenius account to Facebook account
- Bot should say hi with you in Facebook messenger ? => check if possible => impossible => use OTP
- Bot start guide to help user understand what bot can do

Validation in sending money
  # 1 - OTP
  # 2 - Audio message and voice recognization

For Android demo => find airplay connection to connect android with mac

Scenario for bot demo
  # 0 - login & linking bot and jenius app 
    + Start Jeni Bot Assistant => ask user to navigate to Facebook Messenger to start chat with Jeni
    + Login in messenger and finish account linking
    + App receive a push notification to confirm about account linking
  # 1 - show active balance
    + Show all accounts active balance
      $ Primary account
      $ Ecomerce account
  # 2 - spend to much money this week (Personal Finance Assistant) - a warning from bot
    + ???
  # 3 - show what I spent this week
    + list all categories that you want to list out (food, movies, entertaiment, ... all)
    + user can select a category or show all
    + show total money spent, then ask user do you want to list all in detail
    + yes, list all (top 10 items...)
  # 4 - send money to friend
    + user chat: send money
    + bot ask: who do you want to send and list out some top friends (name + xxxx3456) (from history of user)
    + user can select one or input new account number
    + bot verify again the account number by confirming the account with user
    + bot ask about how much money to send ? list out some common balance (500,000 - 1,000,000)
    + user select money, bot ask about the security => OTP or voice recognization
    + send success, app receive a new push notification 
    + user touch on notification, navigate to app and see updated balance
  # 5 - bot send to user some information about the new promotion or good interest => like an assistant
    + bot know the current finance of user (income, outcome, transaction history, ...)
    + bot suggest user to invest in save-it, ...


Scenario
  
  # 2 - 


