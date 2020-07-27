import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateMessagesDetailQueryHandler } from './paginate-messages-detail.query-handler';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MessageDetailMapper } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateMessagesDetailQuery } from './paginate-messages-detail.query';
import { PaginateMessagesDetailService } from './paginate-messages-detail.service';

describe('PaginateMessagesDetailQueryHandler', () => 
{
    let queryHandler: PaginateMessagesDetailQueryHandler;
    let service: PaginateMessagesDetailService;
    let repository: MockMessageDetailRepository;
    let mapper: MessageDetailMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateMessagesDetailQueryHandler,
                {
                    provide: IMessageDetailRepository,
                    useClass: MockMessageDetailRepository
                },
                {
                    provide: PaginateMessagesDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateMessagesDetailQueryHandler>(PaginateMessagesDetailQueryHandler);
        service         = module.get<PaginateMessagesDetailService>(PaginateMessagesDetailService);
        repository      = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);
        mapper          = new MessageDetailMapper();
    });

    describe('main', () => 
    {
        test('PaginateMessagesDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messagesDetail paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateMessagesDetailQuery(
                    [
                        {
                            'command': Command.OFFSET,
                            'value': 0
                        },
                        {
                            'command': Command.LIMIT,
                            'value': 10
                        }
                    ]
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100, 
                    10, 
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});