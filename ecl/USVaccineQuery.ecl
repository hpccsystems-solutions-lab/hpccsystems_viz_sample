#WORKUNIT('name', 'hpccsystems_us_vaccine_query');

_location := 'GEORGIA':STORED('location');


VaccineLayout := RECORD
  unsigned4 date;
  string location;
  unsigned4 total_vaccinations;
  unsigned4 total_distributed;
  unsigned4 people_vaccinated;
  decimal64_32 people_fully_vaccinated_per_hundred;
  decimal64_32 total_vaccinations_per_hundred;
  unsigned4 people_fully_vaccinated;
  decimal64_32 people_vaccinated_per_hundred;
  decimal64_32 distributed_per_hundred;
  unsigned4 daily_vaccinations_raw;
  unsigned4 daily_vaccinations;
  decimal64_32 daily_vaccinations_per_million;
  decimal64_32 share_doses_used;
 END;

ds := DATASET('~samples::clean::covid19::vaccinations::us_state_vaccinations.flat', VaccineLayout, flat);


OUTPUT(TOPN(ds (location=_location), 5,-date),,named('us_vaccine'));

