import java.time.LocalTime;
import java.util.Arrays;
import java.util.Scanner;


public class Program {
    private final Scanner scan;

    public Program() {
        this.scan = new Scanner(System.in);
    }

    public void start() {
        try {
            this.greetUser();

            FileManager.loadFile("files/equipment.txt");
            boolean active = true;
            while (active) {
                this.showMenu();
                int choice = Integer.parseInt(scan.nextLine());


                switch (choice) {
                    case 0 -> active = false;
                    case 1 -> EquipmentManager.printAllEquipments();
                    case 2 -> EquipmentManager.printBallsNeedingMoreAir();
                    case 3 -> EquipmentManager.printEquipmentNeedingToBeReplaced();
                    case 4 -> EquipmentManager.printTableTennisRacketsNeedingNewPad();
                    case 5 -> this.addEquipment();
                    case 6 -> this.removeEquipment();
                }
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private void showMenu() {
        System.out.println("Please enter one of the following options: ");
        System.out.println("[0] To exit the program.");
        System.out.println("[1] Show all of the equipment int the inventory.");
        System.out.println("[2] Show all balls needing air.");
        System.out.println("[3] Show equipment that needs replacement.");
        System.out.println("[4] Show table tennis rackets that needs new pad.");
        System.out.println("[5] Add equipment");
        System.out.println("[6] Remove equipment");

        System.out.print("-> ");
    }

    private void addEquipment() {
        try {
            System.out.println("Enter one of the following options: ");
            System.out.println("[1] Ball\n[2] TennisRacket");
            System.out.print("-> ");
            int choice = Integer.parseInt(scan.nextLine());


            switch (choice) {
                case 1 -> System.out.println("Please enter the properties separated CSV format ',' Ball example: 12, Locker 5, true, basketball, false");
                case 2 -> System.out.println("Please enter the properties separated CSV format ',' TableTennisRacket example: 12, Locker 5, true, false");
            }
            System.out.print("-> ");
            String equipmentDetails = scan.nextLine();
            String[] equipmentDetailsArray = equipmentDetails.split(",");

            EquipmentManager.stringToEquipment(Arrays.asList(equipmentDetailsArray));
            EquipmentManager.save("files/equipmentV2.txt");

            Equipment newestEquipment = EquipmentManager.getEquipment().get(Integer.parseInt(equipmentDetailsArray[0]));

            System.out.println();
            System.out.println("Added: " + newestEquipment.className());
            System.out.println();
            System.out.println(newestEquipment);
            System.out.println();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private void removeEquipment() {

        System.out.println("Please enter the ID of the element you wish to remove: ");
        System.out.print("-> ");
        int ID = Integer.parseInt(scan.nextLine());


        try {
            Equipment equipmentToRemove = EquipmentManager.removeEquipment(ID);
            System.out.println("Successively removed the following:\n" + equipmentToRemove);
            System.out.println();
            EquipmentManager.save("files/equipmentV2.txt");
        } catch (EquipmentNotFoundException e) {
            System.out.printf("%s with ID of %d", e.getMessage(), ID);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void greetUser() {
        LocalTime lt = LocalTime.now();
        int hr = lt.getHour();
        System.out.printf("Good %s dear user! ", this.greeting(hr));

        System.out.println();
        System.out.println();
    }

    private String greeting(int hr) {

        return hr <= 0 ? "good night" :
                hr >= 6 && hr < 9 ? "good morning" :
                        hr >= 12 && hr < 18 ? "good afternoon" :
                                "good evening";

    }
}
