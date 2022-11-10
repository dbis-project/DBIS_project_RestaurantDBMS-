from django.db import models

# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Customers(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=50, blank=True, null=True)
    phone_no = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers'


class Customers1(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=50, blank=True, null=True)
    phone_no = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers1'


# class DiningTable(models.Model):
#     did = models.IntegerField(blank=True, null=True)
#     table_no = models.IntegerField(blank=True, null=True)
#     capacity = models.IntegerField(blank=True, null=True)
#     rstatus = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'dining_table'





class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Customers1(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=50, blank=True, null=True)
    phone_no = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers1'


class DineTable1(models.Model):
    table_no = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'dine_table1'


class DiningTable1(models.Model):
    table_no = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'dining_table1'


class Inventory1(models.Model):
    material_id = models.AutoField(primary_key=True)
    mname = models.CharField(max_length=50, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    unit_m = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inventory1'


class Menu1(models.Model):
    iname = models.CharField(max_length=50, blank=True, null=True)
    descriptions = models.CharField(max_length=250, blank=True, null=True)
    chef = models.CharField(max_length=50, blank=True, null=True)
    availablity = models.CharField(max_length=50, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'menu1'


class Orders1(models.Model):
    oid = models.AutoField(primary_key=True)
    otype = models.CharField(max_length=50, blank=True, null=True)
    odate = models.DateField(blank=True, null=True)
    descriptions = models.CharField(max_length=500, blank=True, null=True)
    table_no = models.IntegerField(blank=True, null=True)
    attendant = models.CharField(max_length=50, blank=True, null=True)
    amount = models.FloatField(blank=True, null=True)
    cphone = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders1'


class Reservation1(models.Model):
    table_no = models.IntegerField(blank=True, null=True)
    peoplecount = models.IntegerField(blank=True, null=True)
    r_date = models.DateField(blank=True, null=True)
    c_number = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation1'


class RevRat1(models.Model):
    cid = models.IntegerField()
    oid = models.IntegerField(blank=True, null=True)
    attendant = models.CharField(max_length=50, blank=True, null=True)
    review = models.CharField(max_length=250, blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rev_rat1'


class Rexpenses1(models.Model):
    sid = models.IntegerField(blank=True, null=True)
    exptye = models.CharField(max_length=50, blank=True, null=True)
    amountspent = models.FloatField(blank=True, null=True)
    descriptions = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rexpenses1'



class Staff1(models.Model):
    stid = models.IntegerField(primary_key=True)
    sname = models.CharField(max_length=50, blank=True, null=True)
    designation = models.CharField(max_length=50, blank=True, null=True)
    date_joined = models.DateField(blank=True, null=True)
    salary = models.IntegerField(blank=True, null=True)
    expense_id = models.IntegerField(blank=True, null=True)
    spassword = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'staff1'


class Suppliers1(models.Model):
    sid = models.IntegerField()
    sname = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    lastsupply = models.DateField(blank=True, null=True)
    contact_no = models.CharField(primary_key=True, max_length=10)

    class Meta:
        managed = False
        db_table = 'suppliers1'



class SysConfig(models.Model):
    variable = models.CharField(primary_key=True, max_length=128)
    value = models.CharField(max_length=128, blank=True, null=True)
    set_time = models.DateTimeField(blank=True, null=True)
    set_by = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sys_config'
