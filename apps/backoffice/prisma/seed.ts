/**
 * Database Seed Script for Community Platform
 * Seeds initial data for Groups, Events, and Users
 */

import {
  PrismaClient,
  UserRole,
  SubscriptionStatus,
  GroupMemberRole,
  EventStatus,
  RSVPStatus,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database for community platform...');

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eventure.so' },
    update: {},
    create: {
      email: 'admin@eventure.so',
      name: 'Admin User',
      password: adminPassword,
      role: UserRole.ADMIN,
      subscriptionStatus: SubscriptionStatus.PREMIUM,
      groupCount: 0,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create Premium Organizer
  const organizerPassword = await bcrypt.hash('organizer123', 10);
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@eventure.so' },
    update: {},
    create: {
      email: 'organizer@eventure.so',
      name: 'Premium Organizer',
      password: organizerPassword,
      role: UserRole.ORGANIZER,
      subscriptionStatus: SubscriptionStatus.PREMIUM,
      groupCount: 0,
    },
  });
  console.log('✅ Created premium organizer:', organizer.email);

  // Create Free Organizer
  const freeOrganizerPassword = await bcrypt.hash('free123', 10);
  const freeOrganizer = await prisma.user.upsert({
    where: { email: 'free@eventure.so' },
    update: {},
    create: {
      email: 'free@eventure.so',
      name: 'Free Organizer',
      password: freeOrganizerPassword,
      role: UserRole.ORGANIZER,
      subscriptionStatus: SubscriptionStatus.FREE,
      groupCount: 0,
    },
  });
  console.log('✅ Created free organizer:', freeOrganizer.email);

  // Create Attendees
  const attendeePassword = await bcrypt.hash('attendee123', 10);
  const attendees = await Promise.all([
    prisma.user.upsert({
      where: { email: 'attendee1@eventure.so' },
      update: {},
      create: {
        email: 'attendee1@eventure.so',
        name: 'Alice Johnson',
        password: attendeePassword,
        role: UserRole.ATTENDEE,
        subscriptionStatus: SubscriptionStatus.FREE,
        groupCount: 0,
      },
    }),
    prisma.user.upsert({
      where: { email: 'attendee2@eventure.so' },
      update: {},
      create: {
        email: 'attendee2@eventure.so',
        name: 'Bob Smith',
        password: attendeePassword,
        role: UserRole.ATTENDEE,
        subscriptionStatus: SubscriptionStatus.FREE,
        groupCount: 0,
      },
    }),
    prisma.user.upsert({
      where: { email: 'attendee3@eventure.so' },
      update: {},
      create: {
        email: 'attendee3@eventure.so',
        name: 'Charlie Brown',
        password: attendeePassword,
        role: UserRole.ATTENDEE,
        subscriptionStatus: SubscriptionStatus.FREE,
        groupCount: 0,
      },
    }),
  ]);
  console.log(`✅ Created ${attendees.length} attendees`);

  // Create Groups
  const techGroup = await prisma.group.upsert({
    where: { id: 'tech-meetup-group' },
    update: {},
    create: {
      id: 'tech-meetup-group',
      name: 'Tech Meetup Community',
      slug: 'tech-meetup-community',
      description: 'A community for tech enthusiasts to connect and learn together',
      category: 'Technology',
      location: 'San Francisco, CA',
      isPremium: true,
      maxMembers: 999999, // Effectively unlimited for premium
      memberCount: 0,
      ownerId: organizer.id,
    },
  });
  console.log('✅ Created tech group:', techGroup.name);

  const bookClub = await prisma.group.upsert({
    where: { id: 'book-club-group' },
    update: {},
    create: {
      id: 'book-club-group',
      name: 'Book Club',
      slug: 'book-club',
      description: 'Monthly book discussions for avid readers',
      category: 'Education',
      location: 'Online',
      isPremium: false,
      maxMembers: 50, // Free tier limit
      memberCount: 0,
      ownerId: freeOrganizer.id,
    },
  });
  console.log('✅ Created book club:', bookClub.name);

  // Add Group Members
  const members = await Promise.all([
    prisma.groupMember.upsert({
      where: {
        groupId_userId: {
          groupId: techGroup.id,
          userId: attendees[0].id,
        },
      },
      update: {},
      create: {
        groupId: techGroup.id,
        userId: attendees[0].id,
        role: GroupMemberRole.MEMBER,
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.upsert({
      where: {
        groupId_userId: {
          groupId: techGroup.id,
          userId: attendees[1].id,
        },
      },
      update: {},
      create: {
        groupId: techGroup.id,
        userId: attendees[1].id,
        role: GroupMemberRole.MEMBER,
        status: 'ACTIVE',
      },
    }),
    prisma.groupMember.upsert({
      where: {
        groupId_userId: {
          groupId: bookClub.id,
          userId: attendees[2].id,
        },
      },
      update: {},
      create: {
        groupId: bookClub.id,
        userId: attendees[2].id,
        role: GroupMemberRole.MEMBER,
        status: 'ACTIVE',
      },
    }),
  ]);

  // Update member counts
  await prisma.group.update({
    where: { id: techGroup.id },
    data: { memberCount: 2 },
  });
  await prisma.group.update({
    where: { id: bookClub.id },
    data: { memberCount: 1 },
  });
  console.log(`✅ Added ${members.length} group members`);

  // Create Events
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const techEvent = await prisma.event.upsert({
    where: { id: 'tech-meetup-event-1' },
    update: {},
    create: {
      id: 'tech-meetup-event-1',
      title: 'Introduction to AI and Machine Learning',
      slug: 'intro-ai-ml',
      description: 'Learn the basics of AI and ML in this beginner-friendly workshop',
      category: 'Workshop',
      startDate: nextWeek,
      endDate: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      location: 'Tech Hub, 123 Innovation St, San Francisco',
      status: EventStatus.PUBLISHED,
      groupId: techGroup.id,
      createdById: organizer.id,
    },
  });
  console.log('✅ Created tech event:', techEvent.title);

  const bookEvent = await prisma.event.upsert({
    where: { id: 'book-club-event-1' },
    update: {},
    create: {
      id: 'book-club-event-1',
      title: 'Monthly Book Discussion: "1984" by George Orwell',
      slug: '1984-discussion',
      description: 'Join us for an engaging discussion about this classic dystopian novel',
      category: 'Discussion',
      startDate: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days after tech event
      endDate: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000), // 90 mins later
      location: 'Zoom Meeting',
      isOnline: true,
      status: EventStatus.PUBLISHED,
      groupId: bookClub.id,
      createdById: freeOrganizer.id,
    },
  });
  console.log('✅ Created book club event:', bookEvent.title);

  // Create RSVPs
  const rsvps = await Promise.all([
    prisma.eventRSVP.upsert({
      where: {
        eventId_userId: {
          eventId: techEvent.id,
          userId: attendees[0].id,
        },
      },
      update: {},
      create: {
        eventId: techEvent.id,
        userId: attendees[0].id,
        status: RSVPStatus.GOING,
      },
    }),
    prisma.eventRSVP.upsert({
      where: {
        eventId_userId: {
          eventId: techEvent.id,
          userId: attendees[1].id,
        },
      },
      update: {},
      create: {
        eventId: techEvent.id,
        userId: attendees[1].id,
        status: RSVPStatus.GOING,
      },
    }),
    prisma.eventRSVP.upsert({
      where: {
        eventId_userId: {
          eventId: bookEvent.id,
          userId: attendees[2].id,
        },
      },
      update: {},
      create: {
        eventId: bookEvent.id,
        userId: attendees[2].id,
        status: RSVPStatus.GOING,
      },
    }),
  ]);
  console.log(`✅ Created ${rsvps.length} RSVPs`);

  console.log('\n🎉 Database seeding completed successfully!\n');
  console.log('Test credentials:');
  console.log('  Admin: admin@eventure.so / admin123');
  console.log('  Premium Organizer: organizer@eventure.so / organizer123');
  console.log('  Free Organizer: free@eventure.so / free123');
  console.log(
    '  Attendees: attendee1@eventure.so, attendee2@eventure.so, attendee3@eventure.so / attendee123\n'
  );
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
