// controllers
import { CreateChannelController } from './controllers/create-channel.controller';
import { CreateChannelsController } from './controllers/create-channels.controller';
import { PaginateChannelsController } from './controllers/paginate-channels.controller';
import { GetChannelsController } from './controllers/get-channels.controller';
import { FindChannelByIdController } from './controllers/find-channel-by-id.controller';
import { FindChannelController } from './controllers/find-channel.controller';
import { UpdateChannelController } from './controllers/update-channel.controller';
import { DeleteChannelByIdController } from './controllers/delete-channel-by-id.controller';
import { DeleteChannelsController } from './controllers/delete-channels.controller';

// resolvers
import { CreateChannelResolver } from './resolvers/create-channel.resolver';
import { CreateChannelsResolver } from './resolvers/create-channels.resolver';
import { PaginateChannelsResolver } from './resolvers/paginate-channels.resolver';
import { GetChannelsResolver } from './resolvers/get-channels.resolver';
import { FindChannelResolver } from './resolvers/find-channel.resolver';
import { FindChannelByIdResolver } from './resolvers/find-channel-by-id.resolver';
import { UpdateChannelResolver } from './resolvers/update-channel.resolver';
import { DeleteChannelByIdResolver } from './resolvers/delete-channel-by-id.resolver';
import { DeleteChannelsResolver } from './resolvers/delete-channels.resolver';

export const CciChannelControllers = [
    CreateChannelController,
    CreateChannelsController,
    PaginateChannelsController,
    GetChannelsController,
    FindChannelByIdController,
    FindChannelController,
    UpdateChannelController,
    DeleteChannelByIdController,
    DeleteChannelsController,
];

export const CciChannelResolvers = [
    CreateChannelResolver,
    CreateChannelsResolver,
    PaginateChannelsResolver,
    GetChannelsResolver,
    FindChannelResolver,
    FindChannelByIdResolver,
    UpdateChannelResolver,
    DeleteChannelByIdResolver,
    DeleteChannelsResolver,
];