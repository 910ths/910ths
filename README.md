Portal
===
Portal is the homepage of 910ths.

## Live demos

- [UAT][uat].
- [Production][production].

[uat]: https://uat.910ths.sa
[production]: https://910ths.sa

### Prerequisites

- [Docker][docker].
- [Docker Compose][docker-compose].
- [Make][make].
- Have port 4000 available and not used.

[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[make]: https://www.gnu.org/software/make/

### Development

1. Run the command `make space`.
2. Run the command  `make install`.
3. Run the command `make serve`.
3. (To watch the changes) Run the command `make gulp-watch`.
4. Navigate to http://localhost:4000.
5. Enjoy.

### Branches

- Production, master.

### Deployment

#### UAT
1. Locally, run the command `make gulp-build`.
2. Push the changes into `master` branch.
3. Click on "Generate preview" on [Siteleaf][siteleaf].
4. Enjoy.

[siteleaf]: https://www.siteleaf.com/

#### Production
1. Click on "Publish changes" on [Siteleaf][siteleaf].
2. In AWS, CloudFront, create invalidation for [Production][production] distribution.
3. Enjoy.
