IMPORT STD;

//Raw data is imported from https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/us_state_vaccinations.csv

rawLayout := RECORD
    STRING date;
    STRING location;
    UNSIGNED4 total_vaccinations;
    UNSIGNED4 total_distributed;
    UNSIGNED4 people_vaccinated;
    DECIMAL people_fully_vaccinated_per_hundred;
    DECIMAL total_vaccinations_per_hundred;
    UNSIGNED4 people_fully_vaccinated;
    DECIMAL people_vaccinated_per_hundred;
    DECIMAL distributed_per_hundred;
    UNSIGNED4 daily_vaccinations_raw;
    UNSIGNED4 daily_vaccinations;
    DECIMAL daily_vaccinations_per_million;
    DECIMAL share_doses_used;
END;

usDs := DATASET('~samples::raw::covid19::vaccinations::us_state_vaccinations.csv', rawLayout, CSV(HEADING(1)));


cleanLayout := RECORD
    STD.Date.Date_t date;
    STRING location;
    UNSIGNED4 total_vaccinations;
    UNSIGNED4 total_distributed;
    UNSIGNED4 people_vaccinated;
    DECIMAL people_fully_vaccinated_per_hundred;
    DECIMAL total_vaccinations_per_hundred;
    UNSIGNED4 people_fully_vaccinated;
    DECIMAL people_vaccinated_per_hundred;
    DECIMAL distributed_per_hundred;
    UNSIGNED4 daily_vaccinations_raw;
    UNSIGNED4 daily_vaccinations;
    DECIMAL daily_vaccinations_per_million;
    DECIMAL share_doses_used;
END;

cleanUSDs  := PROJECT(usDs, TRANSFORM(cleanLayout,
                                  SELF.Date := Std.Date.FromStringToDate(LEFT.Date, '%Y-%m-%d'),
                                  SELF.location:= IF( LEFT.location = 'New York State', 'NEW YORK',Std.Str.ToUpperCase(LEFT.location)),
                                  SELF := LEFT));

OUTPUT(cleanUSDs, , '~samples::clean::covid19::vaccinations::us_state_vaccinations.flat', OVERWRITE, COMPRESSED);
