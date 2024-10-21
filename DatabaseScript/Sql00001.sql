use Miracle
go
create table Users
(
	UserId bigint identity(1,1) primary key,
	EmailId varchar(200) not null,
	[Password] varchar(500) not null,
	IsActive bit not null,
	CreatedDate datetime not null
)
go
create table LookupCategoryDIM
(
	LookupCategoryId bigint identity(1,1) primary key,
	LookupCategoryDescription varchar(100),
	IsActive bit,
	CreatedDate datetime
)
go
create table LookupDIM
(
	LookupId bigint identity(1,1) primary key,
	LookupCategoryId bigint not null,
	LookupDescription varchar(100),
	IsActive bit,
	CreatedDate datetime,

	foreign key (LookupCategoryId) references LookupCategoryDIM(LookupCategoryId)
)
go
Create table Contacts
(
	ContactId bigint identity(1,1) primary key,
	UserId bigint not null,
	SexId bigint not null,
	Dob datetime not null,
	City varchar(500) not null,
	MobileNumber varchar(200) not null,
	EmailId varchar(500) not null,
	RefererId bigint null,
	foreign key (SexId) references LookupDIM(LookupId),
	foreign key (UserId) references Users(UserId),
	foreign key (RefererId) references Users(UserId)
)