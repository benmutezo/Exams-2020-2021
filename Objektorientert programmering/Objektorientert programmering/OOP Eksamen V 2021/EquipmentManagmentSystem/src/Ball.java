public class Ball extends Equipment {
    BallType ballType;
    private boolean fillAir;

    public Ball(int ID, String placement, boolean replaceable, BallType ballType, boolean fillAir) {
        super(ID, placement, replaceable);
        this.ballType = ballType;
        this.fillAir = fillAir;
    }

    public BallType getBallType() {
        return ballType;
    }

    public void setBallType(BallType ballType) {
        this.ballType = ballType;
    }

    public boolean isFillAir() {
        return fillAir;
    }

    public void setFillAir(boolean fillAir) {
        this.fillAir = fillAir;
    }

    @Override
    public String toString() {
        return String.format("%s \nType of ball: %s \nFillAir: %b", super.toString(), getBallType(), isFillAir());
    }

    @Override
    public String toStringForFile() {
        StringBuilder typeFormatted = new StringBuilder();
        String capitalLetter = Character.toString(ballType.name().charAt(0));
        typeFormatted.append(capitalLetter);

        for (int i = 1; i < ballType.name().length(); i++) {
            String restOfLetters = Character.toString(ballType.name().charAt(i)).toLowerCase();
            typeFormatted.append(restOfLetters);
        }

        return String.format("%s\n%s\n%s\n", super.toStringForFile(), typeFormatted, isFillAir());
    }


}
