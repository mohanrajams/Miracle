use Miracle
go
create table LoginHistory
(
	LoginHistoryId bigint identity(1,1) primary key,
	UserId bigint,
	LoginDate datetime,
	LogoutDate datetime
)
go
alter table Contacts add ModifiedBy bigint, ModifiedDate datetime
go
insert into users values
('x@x.com','$V1$10000$WTpfcE9IIsfdlU8CnNrjzZUcY1CENsJtrFz90KD4svIJTR85',1,GETDATE())
go
insert into lookupcategorydim
values ('Sex',1,Getdate())
go
insert into lookupcategorydim
values ('Status',1,Getdate())
go
insert into LookupDIM
values(1,'Male',1,getdate())
go
insert into LookupDIM
values(1,'FeMale',1,getdate())
go
insert into LookupDIM
values(1,'Others',1,getdate())
go
insert into LookupDIM
values(2,'Active',1,getdate())
go
insert into LookupDIM
values(2,'In Progress',1,getdate())
go
insert into LookupDIM
values(2,'Not Started',1,getdate())
go
insert into LookupDIM
values(2,'Not Interested',1,getdate())
go
alter table contacts drop column EmailId
go
alter table contacts add StatusId bigint
go
alter table contacts add constraint FK_Contacts_StatusId foreign key(StatusId) References LookupDIM(LookupId)
go
alter table contacts add Name varchar(500)
go
insert into contacts
values (1,1,cast('1988-05-31' as datetime),'Abu Dhabi','+971543148158',Null,Null,Null,1,'Mohanraja Loganathan')
go
alter table contacts add IsActive bit
go
update lookupdim set lookupdescription='Fe Male' where lookupid=2