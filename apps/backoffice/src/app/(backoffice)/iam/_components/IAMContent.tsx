'use client';

import { Button, Card, EmptyState, DataTable, Badge, Stack } from '@tavia/taviad';
import Link from 'next/link';
import { Plus, Shield, Mail, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/constants';
import { Styled } from './IAMContent.styles';
import type { UserListItem } from '../_types';
import { getRoleBadgeColor } from '../_configs/roleOptions';

type IAMContentProps = {
  users: UserListItem[];
};

export function IAMContent({ users }: IAMContentProps) {
  const t = useTranslations('iam');

  const columns = [
    {
      accessorKey: 'name',
      header: t('table.name'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: any) => (
        <Styled.UserName>{(getValue() as string) || t('common.na')}</Styled.UserName>
      ),
    },
    {
      accessorKey: 'email',
      header: t('table.email'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: any) => (
        <Styled.EmailWrapper>
          <Mail size={14} />
          {getValue() as string}
        </Styled.EmailWrapper>
      ),
    },
    {
      accessorKey: 'role',
      header: t('table.role'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: any) => {
        const role = getValue() as string;
        const roleColors = getRoleBadgeColor(role);
        return (
          <Styled.RoleBadgeWrapper $bg={roleColors.bg} $color={roleColors.color}>
            <Badge>{role}</Badge>
          </Styled.RoleBadgeWrapper>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: t('table.created'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: any) => (
        <Styled.DateWrapper>
          <Calendar size={14} />
          {new Date(getValue() as Date).toLocaleDateString()}
        </Styled.DateWrapper>
      ),
    },
    {
      id: 'actions',
      header: t('table.actions'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <Styled.ActionsWrapper>
          <Link href={ROUTES.IAM.EDIT(row.original.id)}>
            <Button variant="secondary">{t('actions.edit')}</Button>
          </Link>
        </Styled.ActionsWrapper>
      ),
    },
  ];

  return (
    <Styled.Container>
      {/* Header */}
      <Styled.Header>
        <Styled.HeaderLeft>
          <Styled.TitleWrapper>
            <Shield size={28} />
            <Styled.Title>{t('title')}</Styled.Title>
          </Styled.TitleWrapper>
          <Styled.Subtitle>{t('subtitle')}</Styled.Subtitle>
        </Styled.HeaderLeft>
        <Link href={ROUTES.IAM.NEW}>
          <Button variant="primary" icon={<Plus size={18} />}>
            {t('registerNew')}
          </Button>
        </Link>
      </Styled.Header>

      {/* Users Table */}
      <Card>
        <Styled.DataTableWrapper>
          <DataTable
            columns={columns}
            data={users}
            pageSize={10}
            empty={
              <EmptyState
                icon={<Shield size={64} strokeWidth={1.5} />}
                title={t('emptyState.title')}
                subTitle={t('emptyState.description')}
                action={
                  <Link href={ROUTES.IAM.NEW}>
                    <Button variant="primary" icon={<Plus size={18} />}>
                      {t('registerNew')}
                    </Button>
                  </Link>
                }
              />
            }
          />
        </Styled.DataTableWrapper>
      </Card>

      {/* Stats */}
      <Stack direction="row" spacing="md" wrap style={{ marginTop: '2rem' }}>
        <Card style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Styled.StatLabel>{t('stats.totalUsers')}</Styled.StatLabel>
          <Styled.StatValue>{users.length}</Styled.StatValue>
        </Card>
        <Card style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Styled.StatLabel>{t('stats.admins')}</Styled.StatLabel>
          <Styled.StatValue>{users.filter((u) => u.role === 'ADMIN').length}</Styled.StatValue>
        </Card>
        <Card style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Styled.StatLabel>{t('stats.managers')}</Styled.StatLabel>
          <Styled.StatValue>{users.filter((u) => u.role === 'MANAGER').length}</Styled.StatValue>
        </Card>
        <Card style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Styled.StatLabel>{t('stats.employees')}</Styled.StatLabel>
          <Styled.StatValue>{users.filter((u) => u.role === 'EMPLOYEE').length}</Styled.StatValue>
        </Card>
      </Stack>
    </Styled.Container>
  );
}
