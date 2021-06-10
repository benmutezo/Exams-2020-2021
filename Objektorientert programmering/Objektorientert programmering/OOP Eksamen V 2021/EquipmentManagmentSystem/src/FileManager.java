import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class FileManager {

    public static void loadFile(String fileName) throws FileNotFoundException {

        try {
            FileReader fileReader = new FileReader(fileName);
            Scanner scan = new Scanner(fileReader);

            while (scan.hasNextLine()) {
                String line = scan.nextLine();

                switch (line) {
                    case "Ball" -> processEquipment(scan, 5);
                    case "TableTennisRacket" -> processEquipment(scan, 4);
                }


            }
            fileReader.close();

        } catch (FileNotFoundException ex) {
            throw new FileNotFoundException("File not found!");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private static void processEquipment(Scanner equipment, int bound) {
        ArrayList<String> stringArray = new ArrayList<>();

        int i = 0;
        while (i < bound) {

            String line = equipment.nextLine();
            stringArray.add(line);
            i++;
        }
        EquipmentManager.stringToEquipment(stringArray);

        stringArray.clear();
    }

    public static void saveToFile(List<Equipment> equipmentToSave, String fileName) throws IOException {

        try (FileWriter fileWriter = new FileWriter(fileName)) {
            for (Equipment eq : equipmentToSave) {
                fileWriter.write(eq.toStringForFile());
            }

        } catch (IOException ex) {
            throw new IOException(ex.getMessage());
        }

    }

}
