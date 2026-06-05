using System;

namespace SampleCSharpApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the sample C# console app!");
            Console.WriteLine("Choose an option:");
            Console.WriteLine("1. Greet me");
            Console.WriteLine("2. Add two numbers");
            Console.WriteLine("3. Show current date and time");
            Console.Write("Enter 1, 2, or 3: ");

            string choice = Console.ReadLine();
            Console.WriteLine();

            switch (choice)
            {
                case "1":
                    GreetUser();
                    break;
                case "2":
                    AddTwoNumbers();
                    break;
                case "3":
                    ShowDateTime();
                    break;
                default:
                    Console.WriteLine("Invalid option. Please run the program again and choose 1, 2, or 3.");
                    break;
            }

            Console.WriteLine();
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        static void GreetUser()
        {
            Console.Write("What is your name? ");
            string name = Console.ReadLine();
            Console.WriteLine($"Hello, {name}! Nice to meet you.");
        }

        static void AddTwoNumbers()
        {
            Console.Write("Enter the first number: ");
            if (!double.TryParse(Console.ReadLine(), out double first))
            {
                Console.WriteLine("Invalid number.");
                return;
            }

            Console.Write("Enter the second number: ");
            if (!double.TryParse(Console.ReadLine(), out double second))
            {
                Console.WriteLine("Invalid number.");
                return;
            }

            double sum = first + second;
            Console.WriteLine($"The sum of {first} and {second} is {sum}.");
        }

        static void ShowDateTime()
        {
            Console.WriteLine($"Current date and time: {DateTime.Now}");
        }
    }
}
