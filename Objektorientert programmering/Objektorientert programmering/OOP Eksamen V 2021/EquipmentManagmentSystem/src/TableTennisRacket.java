public class TableTennisRacket extends Equipment {
    private boolean changeCoating;

    public TableTennisRacket(int ID, String placement, boolean replaceable, boolean changeCoating) {
        super(ID, placement, replaceable);
        this.changeCoating = changeCoating;
    }

    public boolean isChangeCoating() {
        return changeCoating;
    }

    public void setChangeCoating(boolean changeCoating) {
        this.changeCoating = changeCoating;
    }

    @Override
    public String toString() {
        return String.format("%s\nchangeCoating: %b", super.toString(), changeCoating);
    }


    @Override
    public String toStringForFile() {
        return String.format("%s\n%s\n", super.toStringForFile(), changeCoating);
    }
}

