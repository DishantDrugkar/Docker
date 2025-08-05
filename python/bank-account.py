# Bank Account using OOP

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"₹{amount} deposited successfully.")
        else:
            print("Deposit amount must be greater than 0.")

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"₹{amount} withdrawn successfully.")
        else:
            print("Insufficient balance.")

    def display_balance(self):
        print(f"{self.owner}, your account balance is ₹{self.balance}")


# Using the class
account1 = BankAccount("Dishant", 1000)

account1.display_balance()
account1.deposit(500)
account1.withdraw(300)
account1.display_balance()