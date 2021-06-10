import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class EquipmentManager {
    private static final HashMap<Integer, Equipment> equipments;

    static {
        equipments = new HashMap<>();
    }

    public static void stringToEquipment(List<String> equipment) {
        int ID = Integer.parseInt(equipment.get(0));
        String placement = equipment.get(1);
        boolean replaceable = Boolean.parseBoolean(equipment.get(2));

        if (equipment.size() == 5) {
            BallType ballType = BallType.valueOf(equipment.get(3).toUpperCase());
            boolean fillAir = Boolean.parseBoolean(equipment.get(4));
            Ball ball = new Ball(ID, placement, replaceable, ballType, fillAir);

            equipments.put(ID, ball);

        } else {
            boolean changeCoating = Boolean.parseBoolean(equipment.get(3));
            TableTennisRacket tableTennisRacket = new TableTennisRacket(ID, placement, replaceable, changeCoating);
            equipments.put(ID, tableTennisRacket);
        }

    }


    public static void printAllEquipments() {
        System.out.println("AlL EQUIPMENT IN THE INVENTORY");
        System.out.println();

        for (int equipment : equipments.keySet()) {
            System.out.println(equipments.get(equipment));
            System.out.println();
        }
        System.out.println("Total amount of equipments: " + getAmountOfEquipment());
        System.out.println();
    }

    public static void printBallsNeedingMoreAir() {
        System.out.println("ALL BALLS WHICH NEEDS AIR");
        System.out.println();
        int amount = 0;
        for (int key : equipments.keySet()) {

            Equipment equipment = equipments.get(key);

            if (equipment instanceof Ball) {
                Ball ball = (Ball) equipment;

                if (ball.isFillAir()) {
                    System.out.println(ball);
                    System.out.println();
                    amount++;
                }
            }
        }
        System.out.println("Total number of balls lacking air: " + amount);
        System.out.println();
    }

    public static void printEquipmentNeedingToBeReplaced() {
        System.out.println("ALL EQUIPMENT WHICH NEEDS REPLACEMENT");
        System.out.println();
        int amount = 0;
        for (int key : equipments.keySet()) {
            Equipment equipment = equipments.get(key);

            if (equipment.isReplaceable()) {
                System.out.println(equipment);
                System.out.println();
                amount++;
            }
        }
        System.out.println("Total amount of equipments that needs to be replaced: " + amount);
        System.out.println();
    }

    public static void printTableTennisRacketsNeedingNewPad() {
        System.out.println("ALL RACKETS WHICH NEEDS NEW PADDING");
        System.out.println();
        int amount = 0;

        for (int key : equipments.keySet()) {
            Equipment equipment = equipments.get(key);

            if (equipment instanceof TableTennisRacket) {
                TableTennisRacket tableTennisRacket = (TableTennisRacket) equipment;

                if (tableTennisRacket.isChangeCoating()) {
                    System.out.println(tableTennisRacket);
                    System.out.println();
                    amount++;
                }
            }
        }

        System.out.println("Total amount of TableTennisRacket that needs new pad: " + amount);
        System.out.println();

    }


    public static void save(String fileName) throws IOException {
        ArrayList<Equipment> equipmentAsList = new ArrayList<>(equipments.values());
        FileManager.saveToFile(equipmentAsList, fileName);

    }

    public static HashMap<Integer, Equipment> getEquipment() {
        return equipments;
    }

    private static int getAmountOfEquipment() {
        return equipments.size();
    }


    public static Equipment removeEquipment(int ID) throws EquipmentNotFoundException {
        Iterator<Integer> iter = equipments.keySet().iterator();
        Equipment removedEquipment = null;

        while (iter.hasNext()) {
            int key = iter.next();
            if (equipments.get(key).getID() == ID) {
                removedEquipment = equipments.get(key);
                iter.remove();
            }
        }

        if (removedEquipment == null)
            throw new EquipmentNotFoundException("Equipment not found");

        return removedEquipment;
    }

}
