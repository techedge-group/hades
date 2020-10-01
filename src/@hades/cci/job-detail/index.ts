// commands
import { CreateJobDetailCommandHandler } from './application/create/create-job-detail.command-handler';
import { CreateJobsDetailCommandHandler } from './application/create/create-jobs-detail.command-handler';
import { UpdateJobDetailCommandHandler } from './application/update/update-job-detail.command-handler';
import { DeleteJobDetailByIdCommandHandler } from './application/delete/delete-job-detail-by-id.command-handler';
import { DeleteJobsDetailCommandHandler } from './application/delete/delete-jobs-detail.command-handler';

// queries
import { PaginateJobsDetailQueryHandler } from './application/paginate/paginate-jobs-detail.query-handler';
import { GetJobsDetailQueryHandler } from './application/get/get-jobs-detail.query-handler';
import { FindJobDetailQueryHandler } from './application/find/find-job-detail.query-handler';
import { FindJobDetailByIdQueryHandler } from './application/find/find-job-detail-by-id.query-handler';

// events
import { CreatedJobDetailEventHandler } from './application/events/created-job-detail.event-handler';
import { CreatedJobsDetailEventHandler } from './application/events/created-jobs-detail.event-handler';
import { UpdatedJobDetailEventHandler } from './application/events/updated-job-detail.event-handler';
import { DeletedJobDetailEventHandler } from './application/events/deleted-job-detail.event-handler';
import { DeletedJobsDetailEventHandler } from './application/events/deleted-jobs-detail.event-handler';

// services
import { CreateJobDetailService } from './application/create/create-job-detail.service';
import { CreateJobsDetailService } from './application/create/create-jobs-detail.service';
import { PaginateJobsDetailService } from './application/paginate/paginate-jobs-detail.service';
import { GetJobsDetailService } from './application/get/get-jobs-detail.service';
import { FindJobDetailService } from './application/find/find-job-detail.service';
import { FindJobDetailByIdService } from './application/find/find-job-detail-by-id.service';
import { UpdateJobDetailService } from './application/update/update-job-detail.service';
import { DeleteJobDetailByIdService } from './application/delete/delete-job-detail-by-id.service';
import { DeleteJobsDetailService } from './application/delete/delete-jobs-detail.service';

// models
export { CciJobDetailModel } from './infrastructure/sequelize/sequelize-job-detail.model';


// repository
export { IJobDetailRepository } from './domain/job-detail.repository';
export { SequelizeJobDetailRepository } from './infrastructure/sequelize/sequelize-job-detail.repository';

// sagas
export { JobDetailSagas } from './application/sagas/job-detail.sagas';

export const CciJobDetailHandlers = [
    // commands
    CreateJobDetailCommandHandler,
    CreateJobsDetailCommandHandler,
    UpdateJobDetailCommandHandler,
    DeleteJobDetailByIdCommandHandler,
    DeleteJobsDetailCommandHandler,

    // queries
    PaginateJobsDetailQueryHandler,
    GetJobsDetailQueryHandler,
    FindJobDetailQueryHandler,
    FindJobDetailByIdQueryHandler,

    // events
    CreatedJobDetailEventHandler,
    CreatedJobsDetailEventHandler,
    UpdatedJobDetailEventHandler,
    DeletedJobDetailEventHandler,
    DeletedJobsDetailEventHandler,
];

export const CciJobDetailServices = [
    CreateJobDetailService,
    CreateJobsDetailService,
    PaginateJobsDetailService,
    GetJobsDetailService,
    FindJobDetailService,
    FindJobDetailByIdService,
    UpdateJobDetailService,
    DeleteJobDetailByIdService,
    DeleteJobsDetailService,
];