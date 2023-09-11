
## Restaurant Management App

You will create a mobile application to help restaurant owners manage their food.
  
The owners must sign up for a new account (using a unique email, phone number, full name, password, and address). Every time they login in successfully, the application will display three tabs:
1. **List of Foods**
    * List of Food
    * Owners can add/edit/delete/view foods
    * A food contains name, price, date, and image link. For example, Food = {name: 'Noodle', Origin: 'Vietnam', price: 10, date: new Date(), image: <uri>}
    * There is a live search bar to search foods by name
2. **Daily Notes**
   * List of notes (header, date)
   * Owner can add/view notes
   * A note includes a header, date, and comment. For example, note = {date: new Date(), header: 'Noodle', comment: 'Need to have more noodles next week'}
3. **Personal profile**
    * This screen shows the owner's information (email, phone number, full name, password, address)
    * Owners can change their phone number, password, full name, and address on the screen, but not email.
    * Owners can log out of the application
